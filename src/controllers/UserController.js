const connection = require('../database/connection')
const crypto = require('crypto')

const hashIt = password => crypto
  .createHash('sha256')
  .update(password)
  .digest('hex')

module.exports = {
  async create (request, response) {
    const { email, password } = request.body
      await connection('users').insert({
        email,
        password: hashIt(password)
      })
      .catch (error => {
        return response.json({
          error
        })
      })
      return response.json({
        email
      })
  },

  async read (request, response) {
    const { email } = request.query
    const query = connection('users')
    if (email) query.where('email', 'like', `%${email}%`)
    const users = await query.select('*')
    return response.json(users)
  },

  async update (request, response) {
    const { email, password } = request.body
    const answer = await connection('users')
      .where('email', email)
      .update('password', hashIt(password))
    if (!answer) response.status(400)
    return response.json({
      answer
    })
  }
}
