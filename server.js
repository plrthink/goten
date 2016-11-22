process.env.VUE_ENV = 'server'
var fs = require('fs')
var path = require('path')
var favicon = require('serve-favicon')
var proxyMiddleware = require('http-proxy-middleware')
var config = require('./config')
// Get the HTML layout
var layout = fs.readFileSync(path.resolve('./dist/index.html'), 'utf-8')
var code = fs.readFileSync(path.resolve('./dist/server-bundle.js'), 'utf-8')
// Create a renderer
var bundleRenderer = require('vue-server-renderer').createBundleRenderer(code)
// Create an express server
var express = require('express')
var server = express()
server.use(favicon('./static/logo.png'))
// Serve files from the assets directory
server.use('/static', express.static(
  path.resolve(__dirname, 'dist/static')
))
var proxyTable = config.dev.proxyTable
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  server.use(proxyMiddleware(context, options))
})
// Handle all GET requests
server.get('*', function (request, response) {
  // Render our Vue app to a string
  bundleRenderer.renderToString({ url: request.url }, function (error, html) {
    // Handle the rendered result
    // If an error occurred while rendering...
    if (error) {
      // Log the error in the console
      console.error(error.message)
      console.error(error.stack)
      // Tell the client something went wrong
      return response
        .status(500)
        .send('Server Error')
    }
    // Send the layout with the rendered app's HTML
    response.send(layout.replace('<div id=app></div>', html))
  })
})

server.listen(5000, function (error) {
  if (error) throw error
  console.log('Server is running at localhost:5000')
})
