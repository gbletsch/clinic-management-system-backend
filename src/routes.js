const express = require('express')
const UserController = require('./controllers/UserController')
const CustomerController = require('./controllers/CustomerController')

routes = express.Router()

routes.post('/users', UserController.create)
routes.get('/users', UserController.read)
routes.put('/users', UserController.update)

routes.post('/customers', CustomerController.create)
routes.get('/customers', CustomerController.read)


module.exports = routes
