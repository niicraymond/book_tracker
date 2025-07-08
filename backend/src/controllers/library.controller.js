const axios = require('axios')
const {
  selectBooks,
  selectBookById,
  insertBook,
  updateBook,
  removeBook,
} = require("../models/library.model");

// GET /api/library?status==&genre=&sort_by=&order=
exports.getAllBooks = async (req, res, next) => {
  try {
    const { status, genre, sort_by, order } = req.query;
    const books = await selectBooks({status, genre, sort_by, order});
    res.status(200).json({ books });
  } catch (err) {
    next(err);
  }
};

// GET /api/library/:id
exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await selectBookById(id);
    res.status(200).json({ book });
  } catch (err) {
    next(err);
  }
};


// POST /api/library
exports.createBook = async (req, res, next) => {
  try {
    const { google_id, tags = [], status = null } = req.body;

    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${google_id}`
    );
    const v = data.volumeInfo;

    const bookData = {
      google_id,
      title: v.title,
      authors: v.authors || [],
      published_date: v.publishedDate || null,
      info_link: v.infoLink || null,
      description: v.description || null,
      page_count: v.pageCount || null,
      thumbnail: v.imageLinks?.thumbnail || null,
      categories: v.categories || [],
      tags,
      status,
      rating: null,
      comments: null,
    };

    const newBook = await insertBook(bookData);
    res.status(201).json({ book: newBook });
  } catch (err) {
    if (err.response?.status === 404) {
      return next({ status: 404, msg: 'Book not found in Google Books' });
    }
    next(err);
  }
};

// PATCH /api/library/:id
exports.patchBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBook = await updateBook(id, req.body);
    res.status(200).json({ book: updatedBook });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/library/:id
exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    await removeBook(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
