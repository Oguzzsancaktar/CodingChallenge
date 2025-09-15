import "dotenv/config";
import { createApp } from "./app.js";
import { loadEnv } from "./config/env.js";

const env = loadEnv();
const app = createApp(env.ALLOWED_ORIGIN!);

const port = env.PORT || 4000;
app.listen(port, () => {
  console.log(`[backend] listening on http://localhost:${port}`);
});


