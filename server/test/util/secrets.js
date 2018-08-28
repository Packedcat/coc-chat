const dotenv = require('dotenv')

dotenv.config({ path: '.env' })

const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production'
const MONGODB_URI = prod
  ? process.env['MONGODB_URI']
  : process.env['MONGODB_URI_LOCAL']
const SESSION_SECRET = process.env['SESSION_SECRET']

module.exports = {
  ENVIRONMENT,
  MONGODB_URI,
  SESSION_SECRET,
}
