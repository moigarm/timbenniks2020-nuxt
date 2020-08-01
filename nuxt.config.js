import Prismic from 'prismic-javascript'

export default {
  mode: 'universal',
  target: 'static',
  head: {
    title: 'Tim Benniks',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        name: 'google-site-verification',
        content: 'El5Wtr19CHQY1u_sQOjbuusrXqYCt6I6n3OJSyZEPAg',
      },
      { property: 'og:site_name', content: 'Tim Benniks' },
      { property: 'twitter:card', content: 'summary_large_image' },
      { property: 'twitter:handle', content: 'timbenniks' },
      { property: 'twitter:creator', content: 'timbenniks' },
      { name: 'author', content: 'Tim Benniks' },
      { name: 'robots', content: 'index, follow' },
    ],
    link: [
      { rel: 'preconnect', href: 'https://www.google-analytics.com' },
      { rel: 'preconnect', href: 'https://images.prismic.io' },
    ],
  },
  css: ['assets/styles/index.scss'],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-6797812-3',
      },
    ],
    [
      '@nuxtjs/pwa',
      {
        workbox: {
          clientsClaim: false,
        },
      },
    ],
  ],
  modules: ['@nuxtjs/prismic', '@nuxtjs/sitemap'],
  prismic: {
    endpoint: 'https://timbenniks.prismic.io/api/v2',
    linkResolver: '@/plugins/linkresolver',
    htmlSerializer: '@/plugins/htmlserializer',
    components: true,
    preview: false,
  },
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
  },
  styleResources: {
    scss: [
      'assets/styles/_packages.scss',
      'assets/styles/_variables.scss',
      'assets/styles/_mixins.scss',
    ],
  },
  loading: {
    color: '#d62b31',
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://timbenniks2020-nuxt.vercel.app',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    exclude: ['/startpage'],
  },
  publicRuntimeConfig: {
    algolia_app_id: process.env.ALGOLIA_APP_ID,
    algolia_api_key: process.env.ALGOLIA_ADMIN_KEY,
  },
  router: {
    linkExactActiveClass: 'active',
  },
  pwa: {
    manifest: {
      name: 'timbenniks.nl',
      short_name: 'timbenniks',
    },
  },
  icon: {
    purpose: ['maskable', 'any'],
  },
  generate: {
    routes() {
      return Prismic.getApi('https://timbenniks.prismic.io/api/v2').then(
        (api) => {
          return api
            .query(Prismic.Predicates.at('document.type', 'video'), {
              orderings: '[my.video.publication_date desc]',
              pageSize: 100,
            })
            .then((videos) => {
              return videos.results.map((video) => {
                return `/videos/${video.uid}`
              })
            })
        }
      )
    },
  },
}
