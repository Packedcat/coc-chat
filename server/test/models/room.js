const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now },
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
