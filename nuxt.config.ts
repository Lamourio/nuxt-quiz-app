// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/style/main.scss"],
  app: {
    head: {
      title: "My Quiz App",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Test your knowledge with our engaging quiz questions.",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "My Quiz App",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Test your knowledge with our engaging quiz questions.",
        },
        { hid: "og:image", property: "og:image", content: "/quiz.webp" },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Quiz Questions - My Quiz App",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "Test your knowledge with our engaging quiz questions.",
        },
        { hid: "twitter:image", name: "twitter:image", content: "/quiz.webp" },
      ],
      link: [
        { rel: "canonical", href: "https://example.com/welcome" }, // TODO : add production link
      ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "~/assets/style/global.scss" as *;',
        },
      },
    },
  },

  devtools: { enabled: true },
  modules: ["@pinia/nuxt",'@pinia-plugin-persistedstate/nuxt'],
});
