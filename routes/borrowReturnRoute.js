const express = require('express')
const {borrowBooks, returnBooks} = require('../controller/borrowController')
const borrowReturnRoute = express.Router()

borrowReturnRoute.post('/borrow', borrowBooks)
borrowReturnRoute.post('/return', returnBooks)

module.exports = borrowReturnRoute