import path from "path";

//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "src",
  experimental: {
    asyncContext: true,
  },
  runtimeConfig: {
    supabase: {
      url: process.env.SUPABASE_URL,
      key: process.env.SUPABASE_KEY,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    smtp: {
      host: process.env.MAILER_SMTP_HOST,
      port: process.env.MAILER_SMTP_PORT,
    },
    clientUrl: process.env.CLIENT_URL,
    mongoDbUri: process.env.MONGO_DB_URI,
  },
  alias: {
    "#models": path.resolve("./src/models"),
    "#db": path.resolve("./src/db"),
  },
});
