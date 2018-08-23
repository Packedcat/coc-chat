const http = require('http')
const app = require('./app')
const createSocket = require('./create-socket')

class Server {
  constructor() {
    this.app = app
    this.server = http.Server(this.app)
    this.io = createSocket(this.server)
  }
  start() {
    this.server.listen(this.app.get('port'), () => {
      console.log(
        '\x1b[36m  App is running at http://localhost:%d in %s mode\x1b[0m',
        this.app.get('port'),
        this.app.get('env')
      )
      console.log('\x1b[31m  Press CTRL-C to stop\x1b[0m')
    })
  }
}

module.exports = new Server()
