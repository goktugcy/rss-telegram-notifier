import axios from "axios";
import { parseStringPromise } from "xml2js";
import { getRSSFeedUrl } from "../constants/rssFeeds";
import { createSupabaseClient } from "../db/supabase";
import { URL } from "url";

export async function fetchRSSFeed(source: string, category: string) {
  const url = getRSSFeedUrl(source, category);
  if (!url) {
    console.error("Geçersiz URL:", { source, category });
    return [];
  }

  if (typeof url !== "string") {
    console.error("URL bir string değil:", url);
    return [];
  }

  try {
    const response = await axios.get(url);
    const result = await parseStringPromise(response.data);
    return result.rss.channel[0].item;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "RSS Feed alınırken hata oluştu:",
        error.message,
        error.stack
      );
    } else {
      console.error("RSS Feed alınırken bilinmeyen bir hata oluştu:", error);
    }
    return [];
  }
}

export const checkFeedsAndNotify = async (c: {
  env: { SUPABASE_URL: string; SUPABASE_KEY: string; TELEGRAM_BOT_URL: string };
}) => {
  const client = createSupabaseClient(c.env);

  //TEST RSS FEED
  const items = await fetchRSSFeed("sozcu", "gundem");

  for (const item of items) {
    const { title, link } = item;
    const linkUrl = new URL(item.link[0]);
    const baseUrl = `${linkUrl.protocol}//${linkUrl.host}`;

    const { data: channelData, error: channelError } = await client
      .from("channels")
      .select("*")
      .eq("link", baseUrl)
      .single();

    console.log(baseUrl);
    console.log(channelData?.id);

    if (channelError instanceof Error) {
      console.error("Kanal alınırken hata oluştu:", channelError.message);
      continue;
    }

    const { data, error } = await client
      .from("news")
      .select("title")
      .eq("title", title[0]);

    if (error instanceof Error) {
      console.error("Haber alınırken hata oluştu:", error.message);
      continue;
    }

    if (!data?.length) {
      await client.from("news").insert({
        title: title[0],
        description: item.description[0],
        channel_id: channelData?.id
      });

      const TELEGRAM_BOT_URL = c.env.TELEGRAM_BOT_URL;
      await axios.post(TELEGRAM_BOT_URL as string, {
        chat_id: "811213988",
        text: `Yeni Haber: ${title[0]} - ${link[0]}`,
      });
    }
  }
};
