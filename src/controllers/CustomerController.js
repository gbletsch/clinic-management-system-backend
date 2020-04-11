const connection = require('../database/connection')

module.exports = {
  async create (request, response) {
    const { name } = request.body
      await connection('customers').insert({
        name
      })
      .catch (error => {
        return response.json({
          error
        })
    })
    return response.json({
      name
    })
  },

  async read (request, response) {
    const { name } = request.query

    const query = connection('customers')
    if (name) query.where('name', 'like', `%${name}%`)
    
    const users = await query.select('*')
      .catch(error => {
        return response.json({
          error
        })
      })

    return response.json(users)
  }
}