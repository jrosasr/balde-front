// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      APP_ENV: process.env.APP_ENV
    }
  },

  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-lucide-icons', '@pinia/nuxt'],
  compatibilityDate: '2024-10-11'
})