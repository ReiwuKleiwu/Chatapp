export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'chatapp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  server: {
    port: 8000
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '~/assets/styles/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{
    src: './plugins/vue-carousel.js',
    mode: 'client'
  }, {
    src: '~/plugins/vue-tooltip.js'
  }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    'nuxt-socket-io'
  ],
  router: {
    middleware: ['auth']
  },
  auth: { //Source: https://dev.to/mohammadali0120/nuxt-js-and-express-js-authentication-with-auth-module-and-jwt-26gp
    strategies: {
      local: {
        token: {
          property: "accessToken", 
          global: true,
          required: true,
          type: "Bearer"
        },
        user: {
          property: "user",
          autoFetch: true
        },
        endpoints: {
          login: {
            url: "/auth/login",
            method: "post",
            propertyName: "acessToken"
          },
          logout: false, 
          user: {
            url: "/auth/user",
            method: "get",
            propertyName: "user"
          }
        }
      }
    }
  },
  axios: {
    baseURL: "http://localhost:3000/api"
  },
  toast: {
    position: 'top-right',
    duration: 5000,
    iconPack: 'material'
  },
  io: {
    sockets: [
      {
        url: 'http://localhost:3000',
        default: true
      }
    ]
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
