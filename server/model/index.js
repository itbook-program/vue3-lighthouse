const auth = require('./auth')
const user = require('./user')
const order = require('./order')

module.exports = {
    ...auth,
    ...user,
    ...order
}