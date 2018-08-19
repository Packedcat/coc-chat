const mongoose = require('mongoose')

var msgSchema = mongoose.Schema(
  {
    sid: String,
    cid: String,
    ipaddr: String,
    room: String,
    msg: String,
    timestamp: Date,
  },
  { strict: false }
)

var Message = mongoose.model('Messages', msgSchema)

module.exports = Message
