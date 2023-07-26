const server = require('live-server')
const fs = require('fs')

fs.copyFileSync('../packages/web-broadcast/dist/web-broadcast.js', './server1/web-broadcast.js')
fs.copyFileSync('../packages/web-broadcast/dist/web-broadcast.js', './server2/web-broadcast.js')

fs.copyFileSync(
  '../packages/web-broadcast/iife/web-broadcast-proxy-iife.js',
  './server1/web-broadcast-proxy-iife.js'
)
fs.copyFileSync(
  '../packages/web-broadcast/iife/web-broadcast-proxy-iife.js',
  './server2/web-broadcast-proxy-iife.js'
)

server.start({
  port: 8181,
  host: '0.0.0.0',
  root: './server1',
  file: 'index.html',
})

server.start({
  port: 8182,
  host: '0.0.0.0',
  root: './server2',
  file: 'index.html',
})
