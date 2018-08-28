const _ = require('lodash')

function req2ip(req) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  return _.last(ip.split(':'))
}

module.exports = {
  req2ip,
}
