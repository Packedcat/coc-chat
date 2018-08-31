const socketIO = require('socket.io')
const Message = require('./models/message')
const { req2ip } = require('./util/req-treat')
// TODO: almost need session in socket
// const sessionMiddleware = require('./middleware/session.middleware')

function createSocket(server) {
  const io = socketIO(server)
  io.on('connection', socket => {
    socket.on('chat message', msg => {
      io.emit('chat message', msg)
      const message = new Message({ msg })
      message.save()
    })
    // io.emit('enter', { name: cname, t: 'sysin'})
  })
}

module.exports = createSocket
