const express = require('express')
const {borrowBooks} = require('../controller/borrowController')
const borrowReturnRoute = express.Router()

borrowReturnRoute.post('/borrow', borrowBooks)

module.exports = borrowReturnRoute