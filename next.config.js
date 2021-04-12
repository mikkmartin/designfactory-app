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

module.exports = withSourceMaps(
  withCSS({
    async rewrites() {
      return {
        beforeFiles: [
          // These rewrites are checked after headers/redirects
          // and before pages/public files which allows overriding
          // page files
          {
            source: '/some-page',
            destination: '/somewhere-else',
            has: [{ type: 'query', key: 'overrideMe' }],
          },
        ],
        afterFiles: [
          // These rewrites are checked after pages/public files
          // are checked but before dynamic routes
          {
            source: '/non-existent',
            destination: '/somewhere-else',
          },
        ],
        fallback: [
          // These rewrites are checked after both pages/public files
          // and dynamic routes are checked
          {
            source: '/:path*',
            destination: 'https://my-old-site.com',
          },
        ],
      }
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
