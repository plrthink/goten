var webpack = require('webpack')
var config = require('../config')
var baseWebpackConfig = require('./webpack.base.conf')

var webpackConfig = Object.assign({}, baseWebpackConfig, {
  target: 'node',
  output: {
    path: config.build.assetsRoot,
    libraryTarget: 'commonjs2',
    filename: 'server-bundle.js'
  },
  externals: Object.keys(require('../package.json').dependencies),
  entry: {
    app: './src/main.server.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    })
  ]
})

module.exports = webpackConfig
