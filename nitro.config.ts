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
    },
  },
});
