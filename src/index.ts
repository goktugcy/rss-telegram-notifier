import { Hono } from "hono";
import news from "./routes";
import { Bindings } from "hono/types";
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

app.get("/check-feeds", async (c) => {
  await checkFeedsAndNotify(c);
  return c.text("Feeds checked!");
});

async function handleScheduled(env: EnvBindings) {
  console.log("Cron job tetiklendi, RSS feed'leri kontrol ediliyor...");
  await checkFeedsAndNotify({ env });
}

export default {
  fetch: app.fetch,
  scheduled(event: ScheduledEvent, env: EnvBindings, ctx: ExecutionContext) {
    ctx.waitUntil(handleScheduled(env));
  },
};
