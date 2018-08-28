const socketIO = require('socket.io')
const { req2ip } = require('./util/req-treat')
const Message = require('./models/message')

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
