const dotenv = require('dotenv')
const mongoose = require('mongoose')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const { MONGODB_URI, SESSION_SECRET } = require('../util/secrets')

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true }
)
const db = mongoose.connection
const MongoStore = connectMongo(session)

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('\x1b[36m  Connected to mongodb\x1b[0m')
})

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: MONGODB_URI,
    autoReconnect: true,
  }),
  cookie: {
    maxAge: 10 * 60 * 1000,
  },
})

module.exports = sessionMiddleware
