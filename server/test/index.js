const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: '.env' })

mongoose.connect(
  process.env['MONGODB_URI'],
  { useNewUrlParser: true }
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connected to mongodb error'))
db.once('open', function() {
  console.log('Connected to mongodb')
  var kittySchema = new mongoose.Schema({
    name: String,
  })
  var Kitten = mongoose.model('Kitten', kittySchema)
  var silence = new Kitten({ name: 'Silence' })
  silence.save().then(() => console.log('fuck'))
})
