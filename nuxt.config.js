export default {
  htmlAttrs: {
    'data-theme': 'plenitud',
  },
  server: {
    host: '0.0.0.0',
    port: process.env.NODE_ENV === 'production' ? 3000 : 8002,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Plenitud Admin',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Adquiere nuestros planes de servicios para la vida y empieza a vivir con Plenitud. ',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Grupo Plenitud',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: `Adquiere nuestros planes de servicios para la vida y empieza a vivir con Plenitud. `,
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://grupoplenitud.com/fb.png',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://grupoplenitud.com/fb.png',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://kit.fontawesome.com/3c4bd3a972.js',
        crossorigin: 'anonymous',
      },
      {
        hid: 'maps-googleapis',
        src: `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.GMAP}`,
        defer: true,
      },
    ],
    bodyAttrs: {
      class:
        process.env.NODE_ENV === 'production'
          ? 'production'
          : 'development debug-screens',
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/globals.css', 'vuejs-noty/dist/vuejs-noty.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/validate',
      mode: 'client',
    },
    {
      src: '~/plugins/fb_errors',
      mode: 'client',
    },
    {
      src: '~/plugins/noty',
      mode: 'client',
    },
    {
      src: '~/plugins/currency',
      mode: 'client',
    },
    {
      src: '~/plugins/gmaps',
      mode: 'client',
    },
    {
      src: '~/plugins/estructuras',
      mode: 'client',
    },
    {
      src: '~/plugins/estructuras',
      mode: 'client',
    },
    {
      src: '~/plugins/card',
      mode: 'client',
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    '@nuxtjs/moment',
  ],

  moment: {
    locales: ['es'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/gtm',
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyAfHSGMAJt6cJyfjMlvwnr3N3Flb68x-OQ',
          authDomain: 'plenitud-web-v2.firebaseapp.com',
          databaseURL: 'https://plenitud-web-v2.firebaseio.com',
          projectId: 'plenitud-web-v2',
          storageBucket: 'plenitud-web-v2.appspot.com',
          messagingSenderId: '731380204822',
          appId: '1:731380204822:web:f4c6736f62be84dddbfc37',
          measurementId: 'G-CX4QVYRLXE',
          fcmPublicVapidKey:
            'AAAAQ4c9_EQ:APA91bGXvBfnoK5tlp2RCYOwmZv4Tp2m4SIOxu6EI2hvAh4V0Z6V3m1ToNwsVq2mo0dXhPj2apkrwfGMzFbfKFS31WKNa_sGoQs3MvTzxdrS-wdHe0HEnn9DiH71S6XpUmchBLZpTmzR',
        },
        onFirebaseHosting: false,
        services: {
          auth: {
            disableEmulatorWarnings: false,
            persistence: 'local',
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChanged',
            },
            ssr: true,
            emulatorHost: 'http://localhost',
            emulatorPort:
              process.env.NODE_ENV === 'production' ? undefined : 9099,
          },
          firestore: {
            enablePersistence: true,
            // memoryOnly: false,
            // // chunkName:
            // //   process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
            // static: false,
            // // enablePersistence: true,
            emulatorHost: 'localhost',
            emulatorPort: process.env.NODE_ENV === 'development' ? 8084 : false,
          },
          functions: {
            emulatorHost: 'localhost',
            emulatorPort: process.env.NODE_ENV === 'development' ? 5001 : false,
          },
          storage: {
            emulatorPort: process.env.NODE_ENV === 'development' ? 9199 : false,
            emulatorHost: 'localhost',
          },
          database: {
            emulatorPort: process.env.NODE_ENV === 'development' ? 9000 : false,
            emulatorHost: 'localhost',
          },
          realtimeDb: true,
          performance: true,
          analytics: true,
          remoteConfig: {
            settings: {
              fetchTimeoutMillis: 60000,
              minimumFetchIntervalMillis: 43200000,
            },
            defaultConfig: {
              welcome_message: 'Welcome',
            },
          },
          messaging: {
            createServiceWorker: true,
            actions: [
              {
                action: 'goToUrl',
                url: 'https://github.com/lupas',
              },
              {
                action: 'goToModuleGithub',
                url: 'https://github.com/nuxt-community/firebase-module',
              },
            ],
          },
        },
      },
    ],
    ['vue-scrollto/nuxt', { duration: 500, offset: -80 }],
    // [
    //   'nuxt-validate',
    //   {
    //     lang: 'es',

    //     // regular vee-validate options
    //   },
    // ],
  ],
  gtm: {
    // Always send real GTM events (also when using `nuxt dev`)
    id: 'GTM-5L54DZ8',
    enabled: true,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://us-central1-plenitud-web-v2.cloudfunctions.net/webApi/api/v1'
        : 'http://localhost:5001/plenitud-web-v2/us-central1/webApi/api/v1', // 'http://localhost:5001/plenitud-web-v2/us-central1/webApi/api/v1',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-nested': {},
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
        },
      },
    },
  },
}
