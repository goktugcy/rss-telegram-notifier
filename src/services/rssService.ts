import axios from "axios";
import { parseStringPromise } from "xml2js";
import { getRSSFeedUrl, rssFeeds } from "../constants/rssFeeds";
import { createSupabaseClient } from "../db/supabase";
import { URL } from "url";

export async function fetchRSSFeed(source: string, category: string) {
  const url = getRSSFeedUrl(source, category);
  if (!url) {
    console.error("Invalid URL:", { source, category });
    return [];
  }

  try {
    const response = await axios.get(url);
    const result = await parseStringPromise(response.data);

    const firstItem = result.rss.channel[0].item[0];
    return firstItem ? [firstItem] : [];
  } catch (error) {
    console.error("Error while retrieving RSS Feed:", error);
    return [];
  }
}

export const checkFeedsAndNotify = async (c: {
  env: {
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
    TELEGRAM_BOT_URL: string;
    CHAT_ID: string;
  };
}) => {
  const client = createSupabaseClient(c.env);
  for (const source in rssFeeds) {
    const categories = rssFeeds[source];
    for (const category in categories) {
      const items = await fetchRSSFeed(source, category);

      for (const item of items) {
        const { title, description, link } = item;
        const linkUrl = new URL(item.link[0]);
        const baseUrl = `${linkUrl.protocol}//${linkUrl.host}`;

        const { data: channelData, error: channelError } = await client
          .from("channels")
          .select("*")
          .eq("link", baseUrl)
          .single();

        if (channelError) {
          console.error(
            "Error while retrieving channel:",
            channelError.message
          );
          continue;
        }

        const { data: newsData, error: newsError } = await client
          .from("news")
          .select("title")
          .eq("title", title[0])
          .eq("channel_id", channelData?.id);

        if (newsError) {
          console.error("Error while retrieving news:", newsError.message);
          continue;
        }

        if (!newsData?.length) {
          await client.from("news").insert({
            title: title[0],
            description: item.description[0],
            channel_id: channelData?.id,
          });

          await axios.post(c.env.TELEGRAM_BOT_URL, {
            chat_id: c.env.CHAT_ID,
            text: `*${channelData?.name}*\n\n*Başlık:* ${title[0]}\n\n*Açıklama:* ${description[0]}\n\n[Haberi Oku](${link[0]})`,
            parse_mode: "Markdown",
          });
        }
      }
    }
  }
};
