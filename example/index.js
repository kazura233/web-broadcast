const server = require('live-server')
const fs = require('fs')

fs.copyFileSync('../packages/web-broadcast/dist/web-broadcast.js', './server1/web-broadcast.js')
fs.copyFileSync('../packages/web-broadcast/dist/web-broadcast.js', './server2/web-broadcast.js')

fs.copyFileSync(
  '../packages/web-broadcast-proxy/dist/web-broadcast-proxy.js',
  './server1/web-broadcast-proxy.js'
)
fs.copyFileSync(
  '../packages/web-broadcast-proxy/dist/web-broadcast-proxy.js',
  './server2/web-broadcast-proxy.js'
)

server.start({
  port: 8181,
  host: '0.0.0.0',
  root: './server',
  file: 'index.html',
})

server.start({
  port: 8182,
  host: '0.0.0.0',
  root: './server',
  file: 'index.html',
})
