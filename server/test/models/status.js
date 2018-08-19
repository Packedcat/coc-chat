const mongoose = require('mongoose')

const satusSchema = new mongoose.Schema({
  hitPoint: Number,
  magicPoint: Number,
  luck: Number,
  sanity: Number,
  idea: Number,
  STR: Number,
  CON: Number,
  SIZ: Number,
  DEX: Number,
  APP: Number,
  INT: Number,
  POW: Number,
  EDU: Number,
  MOV: Number,
})

const Status = mongoose.model('Status', statusSchema)

module.exports = Status
