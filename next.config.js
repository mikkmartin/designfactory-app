module.exports = {
  async rewrites() {
    return [
      {
        source: '/invoice/:slug',
        destination: '/api/invoice',
      },
    ]
  },
}
