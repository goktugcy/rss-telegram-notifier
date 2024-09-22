import axios from "axios";
import { parseStringPromise } from "xml2js";
import { getRSSFeedUrl } from "../constants/rssFeeds";

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
