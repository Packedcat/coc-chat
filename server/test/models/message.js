const mongoose = require('mongoose')

const msgSchema = new mongoose.Schema({
  msg: String,
  date: { type: Date, default: Date.now },
})

const Message = mongoose.model('Message', msgSchema)

module.exports = Message
