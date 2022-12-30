const server = require('live-server')
const fs = require('fs')

fs.copyFileSync('../dist/web-broadcast.js', './server/web-broadcast.js')

server.start({
  port: 8181,
  host: '0.0.0.0',
  root: './server',
  file: 'index.html',
})
