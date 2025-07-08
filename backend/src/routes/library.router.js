const express = require("express")
const {
  getAllBooks,
  getBookById,
  createBook,
  patchBook,
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
.patch(patchBook)
.delete(deleteBook)

module.exports = libraryRouter