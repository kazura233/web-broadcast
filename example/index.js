const server = require('live-server')
const fs = require('fs')

fs.copyFileSync('../dist/web-broadcast.js', './server1/web-broadcast.js')

server.start({
  port: 8181,
  host: '0.0.0.0',
  root: './server',
  file: 'index.html',
})

fs.copyFileSync('../dist/web-broadcast.js', './server2/web-broadcast.js')
server.start({
  port: 8182,
  host: '0.0.0.0',
  root: './server',
  file: 'index.html',
})
