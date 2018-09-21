const path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const lusca = require('lusca')
const passport = require('passport')
const bodyParser = require('body-parser')
const compression = require('compression')
const roomController = require('./controllers/room.controller')
const accountController = require('./controllers/account.controller')
const sessionMiddleware = require('./middleware/session.middleware')
const { isAuthenticated } = require('./config/passport.config')

dotenv.config({ path: '.env' })

const app = express()
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')
// compress all responses
// app.use(compression)
// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// use mongoDB to store session
app.use(sessionMiddleware)
// Simple, unobtrusive authentication
app.use(passport.initialize())
app.use(passport.session())
// Web application security
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))

app.get('/', (req, res) => {
  res.render('room')
})

app.get('/api', (req, res) => {
  res.render('api')
})


app.use(roomController)
app.use(accountController)

module.exports = app
