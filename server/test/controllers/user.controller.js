const User = require('../models/user')

const postSignup = (req, res, next) => {
  const user = new User({
    name: req.body.username,
    password: req.body.password,
  })

  User.findOne({ name: req.body.username }, (err, existingUser) => {
    if (err) return next(err)
    if (existingUser) return res.redirect('/signup')
    user.save(err => {
      if (err) return next(err)
      req.logIn(user, err => {
        if (err) return next(err)
        res.redirect('/')
      })
    })
  })
}

module.exports = {
  postSignup,
}
