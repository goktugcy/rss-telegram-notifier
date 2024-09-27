import axios from "axios";
import { parseStringPromise } from "xml2js";
import { getRSSFeedUrl, rssFeeds } from "../constants/rssFeeds";
import { createSupabaseClient } from "../db/supabase";
import { URL } from "url";

interface EnvBindings {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  TELEGRAM_BOT_URL: string;
  CHAT_ID: string;
}

const sendTelegramNotification = async (
  env: EnvBindings,
  channelName: string,
  title: string,
  description: string,
  link: string
) => {
  await axios.post(env.TELEGRAM_BOT_URL, {
    chat_id: env.CHAT_ID,
    text: `*${channelName}*\n\n ${title}\n\n ${
      description || ""
    }\n\n [Haberin devamı](${link})`,
    parse_mode: "Markdown",
  });
};

const getChannelData = async (client: any, baseUrl: string) => {
  const { data: channelData, error: channelError } = await client
    .from("channels")
    .select("*")
    .eq("link", baseUrl)
    .single();

  if (channelError) {
    console.error("Error while retrieving channel:", channelError.message);
    return null;
  }
  return channelData;
};

const isNewsAlreadyExists = async (
  client: any,
  title: string,
  channelId: number
) => {
  const { data: newsData, error: newsError } = await client
    .from("news")
    .select("title")
    .eq("title", title);

  if (newsError) {
    console.error("Error while retrieving news:", newsError.message);
    return true;
  }
  return newsData?.length > 0;
};

export async function fetchRSSFeed(source: string, category: string) {
  const url = getRSSFeedUrl(source, category);
  if (!url) {
    console.error("Invalid URL:", { source, category });
    return [];
  }

  console.log(`Fetching RSS feed from: ${url}`);

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RSSFetcher/1.0)",
        Accept: "application/rss+xml, application/xml; q=0.9, */*; q=0.8",
      },
    });
    const result = await parseStringPromise(response.data);
    const firstItem = result.rss?.channel?.[0]?.item?.[0];

    if (!firstItem) {
      console.error("No items found in RSS feed.", { source, category });
      return [];
    }

    const title = firstItem.title?.[0];
    const description = firstItem.description?.[0] || "";
    const link = firstItem.link?.[0];

    return [{ title, description, link }];
  } catch (error) {
    console.error("Error while retrieving RSS Feed:", error);
    return [];
  }
}

export const checkFeedsAndNotify = async (env: EnvBindings) => {
  const client = createSupabaseClient(env);

  try {
    await Promise.all(
      Object.keys(rssFeeds).flatMap((source) => {
        const categories = rssFeeds[source];

        return Object.keys(categories).map(async (category) => {
          const items = await fetchRSSFeed(source, category);

          for (const item of items) {
            const { title, link, description } = item;

            let linkUrl;
            try {
              linkUrl = new URL(link);
            } catch (error) {
              console.error("Invalid URL string:", link);
              continue;
            }

            const baseUrl = `${linkUrl.protocol}//${linkUrl.host}`;
            const channelData = await getChannelData(client, baseUrl);

            if (!channelData) continue;

            const newsExists = await isNewsAlreadyExists(
              client,
              title,
              channelData.id
            );

            if (!newsExists) {
              await client.from("news").insert({
                title,
                description,
                channel_id: channelData.id,
              });

              await sendTelegramNotification(
                env,
                channelData.name,
                title,
                description,
                link
              );
            }
          }
        });
      })
    );
  } catch (error) {
    console.error("Error during feed processing:", error);
  }
};
