import { Hono } from "hono";
import news from "./routes";
import { Bindings } from "hono/types";
import { createSupabaseClient } from "./db/supabase";
import { checkFeedsAndNotify } from "./services/rssService";
interface EnvBindings extends Bindings {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  TELEGRAM_BOT_URL: string;
}

const app = new Hono<{ Bindings: EnvBindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/news", news);

app.get("/health", async (c) => {
  const client = createSupabaseClient(c.env);
  const { data, error } = await client.from("channels").select("*");
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json(data);
});

app.get("/check-feeds", async (c) => {
  await checkFeedsAndNotify(c);
  return c.text("Feeds checked!");
});

export default app;
