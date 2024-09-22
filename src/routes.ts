import { Hono } from "hono";
import { fetchRSSFeed } from "./services/rssService";
import { getRSSFeedUrl } from "./constants/rssFeeds";

const news = new Hono();

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

  let items = await fetchRSSFeed(source, category);

  if (keyword) {
    items = items.filter((item) =>
      item.title?.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  return c.json(items);
});

export default news;
