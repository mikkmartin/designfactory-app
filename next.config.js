const withCSS = require('@zeit/next-css')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const withTM = require('next-transpile-modules')(['monaco-editor'])

module.exports = withCSS(
  withTM({
    async rewrites() {
      return [
        {
          source: '/invoice/:slug',
          destination: '/api/invoice',
        },
      ]
    },
    webpack: config => {
      const rule = config.module.rules
        .find(rule => rule.oneOf)
        .oneOf.find(r => r.issuer && r.issuer.include && r.issuer.include.includes('_app'))
      if (rule) {
        rule.issuer.include = [rule.issuer.include, /[\\/]node_modules[\\/]monaco-editor[\\/]/]
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
