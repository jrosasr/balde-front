// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL
    }
  },
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-lucide-icons"]
})