import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./src/db/schemas.ts",
  out: "./src/db/migrations",
  dialect: "turso",
  dbCredentials: {
    // url: "file:./src/db/chat.db",
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
});
