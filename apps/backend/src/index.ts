import "dotenv/config";
import { createApp } from "./app.js";
import { loadEnv } from "./config/env.js";
import { initDb } from "./db/lowdb.js";

const env = loadEnv();
const app = createApp(env.ALLOWED_ORIGIN!);
const port = env.PORT || 4000;

initDb().then(() => {
  app.listen(port, () => {
    console.log(`[backend] listening on http://localhost:${port}`);
  });
});


