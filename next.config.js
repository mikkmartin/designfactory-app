const withCSS = require('@zeit/next-css')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const withSourceMaps = require('@zeit/next-source-maps')()
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA,
} = process.env

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA || VERCEL_GITLAB_COMMIT_SHA || VERCEL_BITBUCKET_COMMIT_SHA

process.env.SENTRY_DSN = SENTRY_DSN
const isProd = process.env.NODE_ENV === 'production'

module.exports = withSourceMaps(
  withCSS({
    async rewrites() {
      return [
        {
          source: '/invoice/:slug',
          destination: '/api/invoice',
        },
        {
          source: '/bee.js',
          destination: 'https://cdn.splitbee.io/sb.js',
        },
        {
          source: '/_hive/:slug',
          destination: 'https://hive.splitbee.io/:slug',
        },
      ]
    },
    webpack: (config, options) => {
      if (!options.isServer) config.resolve.alias['@sentry/node'] = '@sentry/browser'
      if (
        SENTRY_DSN &&
        SENTRY_ORG &&
        SENTRY_PROJECT &&
        SENTRY_AUTH_TOKEN &&
        COMMIT_SHA &&
        NODE_ENV === 'production'
      ) {
        config.plugins.push(
          new SentryWebpackPlugin({
            include: '.next',
            ignore: ['node_modules'],
            urlPrefix: '~/_next',
            release: COMMIT_SHA,
          })
        )
      }

      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['json'],
          filename: 'static/[name].worker.js',
        })
      )
      return config
    },
    cssLoaderOptions: { url: false },
  })
)
