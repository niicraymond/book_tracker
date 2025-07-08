const express = require("express")
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/library.controller");

const libraryRouter = express.Router();

libraryRouter
.route("/")
.get(getAllBooks)
.post(createBook);

libraryRouter
.route('/:id')
.get(getBookById)
.patch(updateBook)
.delete(deleteBook)

module.exports = libraryRouter