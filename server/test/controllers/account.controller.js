const passport = require('passport')
const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/account/signin', (req, res) => {
  res.render('signin')
})

router.get('/account/signup', (req, res) => {
  res.render('signup')
})

router.post('/account/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.redirect('/account/signin')
    req.logIn(user, err => {
      if (err) return next(err)
      res.redirect(req.session.returnTo || '/')
    })
  })(req, res, next)
})

router.post('/account/signup', (req, res, next) => {
  const user = new User({
    name: req.body.username,
    password: req.body.password,
  })

  User.findOne({ name: req.body.username }, (err, existingUser) => {
    if (err) return next(err)
    if (existingUser) return res.redirect('/account/signup')
    user.save(err => {
      if (err) return next(err)
      req.logIn(user, err => {
        if (err) return next(err)
        res.redirect('/')
      })
    })
  })
})

module.exports = router
