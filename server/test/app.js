const dotenv = require('dotenv')
const express = require('express')
const lusca = require('lusca')
const passport = require('passport')
const bodyParser = require('body-parser')
const compression = require('compression')
const roomController = require('./controllers/room.controller')
const userController = require('./controllers/user.controller')
const sessionMiddleware = require('./middleware/session.middleware')
require('./config/passport.config')

dotenv.config({ path: '.env' })

const app = express()
app.set('port', process.env.PORT || 3000)

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
// app.use(lusca.xframe('SAMEORIGIN'))
// app.use(lusca.xssProtection(true))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/room.html')
})
app.get('/login', (req, res) => {
  if (req.user) return res.redirect('/')
  res.sendFile(__dirname + '/login.html')
})
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.redirect('/login')
    req.logIn(user, err => {
      if (err) return next(err)
      res.redirect(req.session.returnTo || '/')
    })
  })(req, res, next)
})
app.post('/signup', userController.postSignup)

module.exports = app
