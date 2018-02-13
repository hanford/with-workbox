const withOffline = require('next-offline')

module.exports = withOffline({
  UNSAFE_workbox: true,
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
})
