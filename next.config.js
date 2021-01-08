const withCSS = require('@zeit/next-css')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = withCSS({
  async rewrites() {
    return [
      {
        source: '/invoice/:slug',
        destination: '/api/invoice',
      },
    ]
  },
  webpack: config => {
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
