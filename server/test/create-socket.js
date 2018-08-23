const socketIO = require('socket.io')

function createSocket(server) {
  const io = socketIO(server)
  io.on('connection', socket => {
    socket.on('chat message', msg => {
      io.emit('chat message', msg)
    })
  })
}

module.exports = createSocket
