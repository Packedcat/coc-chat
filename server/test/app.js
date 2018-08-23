const express = require('express')
const dotenv = require('dotenv')
const roomController = require('./controllers/room')

const app = express()

dotenv.config({ path: '.env' })

app.set('port', process.env.PORT || 3000)
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

module.exports = app
