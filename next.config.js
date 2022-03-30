const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const {
  NEXT_PUBLIC_STORAGE_URL,
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

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/files/invoice',
        permanent: false,
      },
      {
        source: '/files',
        destination: '/files/invoice',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/invoice/:slug',
        destination: '/api/invoice',
      },
      {
        source: '/images/:slug',
        destination: '/api/bucket/:slug',
      },
      {
        source: '/files/:slug.([0-9a-z]+$)',
        destination: '/api/render/:slug',
      },
      {
        source: '/files/:slug/:file',
        destination: `${NEXT_PUBLIC_STORAGE_URL}/themes/files/:slug/:file`,
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
    return config
  },
  cssLoaderOptions: { url: false },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
