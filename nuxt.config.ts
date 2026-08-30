// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/fonts"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || "",
    contactFrom:
      process.env.CONTACT_FROM ||
      "Flip Fixer Website <info@theflipfixer.com>",
    contactTo: process.env.CONTACT_TO || "jon@theflipfixer.com",
  },
});
