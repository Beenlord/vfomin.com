export default {
    server: {
        host: process.env.APP_HOST ?? '0.0.0.0',
        port: process.env.APP_PORT ?? 3000,
    },

    head: {
        title: '',
        htmlAttrs: {
            lang: 'ru',
        },
        meta: [
            {charset: 'utf-8'},
            {
                name: 'viewport',
                content:
                        'width=device-width, initial-scale=1, user-scalable=no',
            },
            {name: 'format-detection', content: 'telephone=no'},
            {
                name: 'apple-mobile-web-app-title',
                content: ''
            },
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/png',
                href: '/favicon/favicon-96x96.png',
                sizes: '96x96'
            },
            {rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg'},
            {rel: 'shortcut icon', href: '/favicon/favicon.ico'},
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/favicon/apple-touch-icon.png'
            },
            {rel: 'manifest', href: '/favicon/site.webmanifest'},
        ],
    },

    css: ['@/assets/scss/main.scss'],

    components: true,

    modules: ['@nuxtjs/axios'],
};
