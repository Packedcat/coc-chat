const _ = require('lodash')
const passport = require('passport')
const passportLocal = require('passport-local')
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

const localStrategy = new passportLocal.Strategy((name, password, done) => {
  User.findOne({ name: name }, (err, user) => {
    if (err) return done(err)
    if (!user) {
      return done(undefined, false, { message: `Name ${name} not found.` })
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err)
      if (isMatch) return done(undefined, user)
      return done(undefined, false, { message: 'Invalid email or password.' })
    })
  })
})

passport.use(localStrategy)

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

const isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0]

  if (_.find(req.user.tokens, { kind: provider })) {
    next()
  } else {
    res.redirect(`/auth/${provider}`)
  }
}

module.exports = {
  isAuthorized,
  isAuthenticated,
}
