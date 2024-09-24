import { Hono } from "hono";
import news from "./routes";
import { Bindings } from "hono/types";
import { checkFeedsAndNotify } from "./services/rssService";

interface EnvBindings extends Bindings {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
  TELEGRAM_BOT_URL: string;
  CHAT_ID: string;
}

const app = new Hono<{ Bindings: EnvBindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/news", news);

app.get("/check-feeds", async (c) => {
  await checkFeedsAndNotify(c.env);
  return c.text("Feeds checked!");
});

async function handleScheduled(env: EnvBindings) {
  console.log("Cron job triggered, checking RSS feeds...");
  await checkFeedsAndNotify(env);
}

export default {
  fetch: app.fetch,
  scheduled(event: ScheduledEvent, env: EnvBindings, ctx: ExecutionContext) {
    return handleScheduled(env);
  },
};
