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

  try {
    const response = await axios.get(url);
    const result = await parseStringPromise(response.data);

    const firstItem = result.rss.channel[0].item[0];
    return firstItem ? [firstItem] : [];
  } catch (error) {
    console.error("RSS Feed alınırken hata oluştu:", error);
    return [];
  }
}

export const checkFeedsAndNotify = async (c: {
  env: { SUPABASE_URL: string; SUPABASE_KEY: string; TELEGRAM_BOT_URL: string };
}) => {
  const client = createSupabaseClient(c.env);

  // TEST RSS FEED
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

    if (channelError) {
      console.error("Kanal alınırken hata oluştu:", channelError.message);
      continue;
    }

    const { data: newsData, error: newsError } = await client
      .from("news")
      .select("title")
      .eq("title", title[0])
      .eq("channel_id", channelData?.id);

    if (newsError) {
      console.error("Haber alınırken hata oluştu:", newsError.message);
      continue;
    }

    if (!newsData?.length) {
      await client.from("news").insert({
        title: title[0],
        description: item.description[0],
        channel_id: channelData?.id,
      });

      // Telegram'a bildirim gönder
      await axios.post(c.env.TELEGRAM_BOT_URL, {
        chat_id: "-1002329601365",
        text: `${title[0]} - ${link[0]}`,
      });
    }
  }
};
