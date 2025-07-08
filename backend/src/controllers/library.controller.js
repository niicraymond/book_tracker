const {
  selectBooks,
  selectBookById,
  insertBook,
  updateBook,
  removeBook,
} = require("../models/library.model");


// GET /api/library?status=
exports.getAllBooks = (req, res, next) => {
  const {status} = req.query
  return selectBooks(status)
  .then(books => {
    res.status(200).json({books})
  })
  .catch(next)
};

// GET /api/library/:id
exports.getBookById = (req, res, next) => {
  const {id} = req.params
  return selectBookById(id)
  .then(book => {
    res.status(200).json({book})
  })
  .catch(next)
};

// POST /api/library
exports.createBook = (req, res, next) => {
  return insertBook(req.body)
  .then(newBook => {
    res.status(201).json({book: newBook})
  })
  .catch(next)
};

// PATCH /api/library/:id
exports.patchBook = (req, res, next) => {
 const {id} = req.params
 return updateBook(id, req.body)
 .then(updatedBook => {
    res.status(200).json({book: updatedBook})
 })
 .catch(next)
};


// DELETE /api/library/:id
exports.deleteBook = (req, res, next) => {
  const {id} = req.params
  return removeBook(id)
  .then(() => {
    res.sendStatus(204)
  })
  .catch(next)
};
