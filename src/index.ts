import { Hono } from "hono";
import news from "./routes";
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/news", news);

export default app;
