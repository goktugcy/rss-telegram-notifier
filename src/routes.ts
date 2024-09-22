import { Hono } from "hono";
import { fetchRSSFeed } from "./services/rssService";
import { getRSSFeedUrl } from "./constants/rssFeeds";

const news = new Hono();

interface RSSItem {
  title: string[];
  link: string[];
  guid: { _: string; $: { isPermaLink: string } }[];
  description: string[];
  pubDate: string[];
  "media:content"?: {
    $: {
      medium: string;
      url: string;
      expression: string;
      type: string;
      width: string;
      height: string;
    };
  }[];
}

news.get("/", async (c) => {
  const source = c.req.query("source");
  const category = c.req.query("category");
  const keyword = c.req.query("keyword");

  if (!source || !category) {
    return c.json(
      { error: "source ve category parametreleri gereklidir." },
      400
    );
  }

  const rssUrl = getRSSFeedUrl(source, category);

  if (!rssUrl) {
    return c.json({ error: "Geçersiz haber kaynağı veya kategori." }, 400);
  }

  let items: RSSItem[] = await fetchRSSFeed(source, category);

  if (keyword) {
    items = items.filter((item: RSSItem) =>
      item.title[0]?.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  return c.json(items);
});

export default news;
