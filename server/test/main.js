const http = require('http')
const app = require('./app')
const socketServer = require('./socket-server')

const server = http.Server(app)
socketServer.attach(server)

server.listen(app.get('port'), () => {
  console.log(
    '\x1b[36m  App is running at http://localhost:%s in %s mode\x1b[0m',
    app.get('port'),
    app.get('env')
  )
  console.log('\x1b[31m  Press CTRL-C to stop\x1b[0m')
})
