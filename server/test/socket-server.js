const socketIO = require('socket.io')
const Message = require('./models/message')
const sessionMiddleware = require('./middleware/session.middleware')
const { req2ip } = require('./util/req-treat')

function createSocket(server) {
  const io = socketIO(server)
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next)
  })
  io.on('connection', socket => {
    const request = socket.request
    const session = request.session
    const ipaddr = req2ip(request)
    const store = request.sessionStore
    const sid = session.id
    const skid = socket.id
    const cookies = {}
    socket.on('ENTER_ROOM', id => {})
    socket.on('chat message', msg => {
      io.emit('chat message', msg)
      const message = new Message({ msg })
      message.save()
    })
    io.sockets.emit('enter', { name: cname, t: 'sysin' })
  })
}
class SocketServer {
  constructor() {
    this.io = socketIO()
    this.io.use((socket, next) => {
      sessionMiddleware(socket.request, socket.request.res, next)
    })
  }
  attach(server) {
    this.io.attach(server)
  }
  createRoom(name) {
    const nsp = this.io.of(name)
    nsp.on('connection', socket => {
      socket.on('chat message', msg => {
        nsp.emit('chat message', msg)
        const message = new Message({ msg })
        message.save()
      })
      socket.on('disconnect', () => {
        nsp.emit('chat message', 'disconnect')
      })
      nsp.emit('chat message', 'sysin')
    })
  }
}

module.exports = new SocketServer()
