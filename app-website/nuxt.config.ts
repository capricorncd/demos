// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
  head: {
    title: 'School Circle - College student video social media platform',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1, minimum-scale=1' },
      { name: 'description', content: 'School Circle - College student video social media platform', hid: 'description' },
      { name: 'keywords', content: 'School Circle, College student video social media platform' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.png' }
    ],
    script: [
      // share install
      { src: '//webapi.amap.com/maps?v=1.4.10&key=1d0e4420bc5b99f19c1ce23dc634fc28&plugin=AMap.Geocoder' },
      { src: '//webapi.amap.com/ui/1.0/main.js?v=1.0.11' },
      { src: 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js' },
    ]
  },
},
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/constants.scss',
    '@/assets/scss/index.scss',
    'swiper/swiper-bundle.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '@/plugins/swiper.js',
      ssr: false
    }
  ],
})
