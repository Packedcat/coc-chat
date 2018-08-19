const mongoose = require('mongoose')

const charSchema = new mongoose.Schema(
  {
    sid: String,
    cid: String,
    ipaddr: String,
    room: String,
    msg: String,
    timestamp: Date,
    skills: String,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

const Character = mongoose.model('Character', charSchema)

module.exports = Character
