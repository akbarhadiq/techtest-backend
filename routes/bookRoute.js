const express = require('express')
const bookRouter = express.Router()

const {getAllBooks, getBookById, addNewBook, updateBook, deleteBook} = require('../controller/booksController')

bookRouter.get('/books', getAllBooks)
bookRouter.get('/books/:id', getBookById)
bookRouter.post('/books', addNewBook)
bookRouter.patch('/books/:id', updateBook)
bookRouter.delete('/books/:id', deleteBook)

module.exports = bookRouter