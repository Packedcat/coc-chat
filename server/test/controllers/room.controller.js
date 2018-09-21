const express = require('express')
const router = express.Router()
const Room = require('../models/room')
const socketServer = require('../socket-server')

// TODO: error catch

router.get('/api/rooms', (req, res, next) => {
  Room.find((err, result) => {
    if (err) return next(err)
    res.send(result)
  })
})

router.post('/api/rooms', (req, res) => {
  Room.findOne({ name: req.body.name }, (err, existingRoom) => {
    if (err) return next(err)
    // if (existingRoom) return res.redirect('/account/signup')
    const room = new Room({
      name: req.body.name,
    })
    room.save(err => {
      if (err) return next(err)
      socketServer.createRoom(room.name)
      res.send(room)
    })
  })
})

router.delete('/api/rooms/:room_id', (req, res, next) => {
  Room.deleteOne({ _id: req.params.room_id }, (err, result) => {
    if (err) return next(err)
    res.send(result)
  })
})

router.get('/api/rooms/:room_id', (req, res, next) => {
  Room.findOne({ _id: req.params.room_id }, (err, result) => {
    if (err) return next(err)
    res.send(result)
  })
})


router.patch('/api/rooms/:room_id', (req, res, next) => {
  Room.findOne({ _id: req.params.room_id }, (err, result) => {
    if (err) return next(err)
    // update
    res.send(result)
  })
})


module.exports = router
