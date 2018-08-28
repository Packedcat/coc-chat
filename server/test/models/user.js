const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
)

userSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, undefined, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

const User = mongoose.model('User', userSchema)

module.exports = User
