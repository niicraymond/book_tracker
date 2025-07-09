
import React, { useState, useEffect } from 'react';
import api from '../api';
import AddBookForm from '../components/AddBookForm';
import BookCard from '../components/BookCard';

export default function LibraryPage() {
  const [books, setBooks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Fetch all books on mount
  useEffect(() => {
    api.get('/library')
      .then(res => setBooks(res.data.books))
      .catch(err => {
        console.error(err);
        setError('Failed to load books');
      })
      .finally(() => setLoading(false));
  }, []);

  // Add a newly created book to state
  const handleNewBook = (book) => {
    setBooks(prev => [book, ...prev]);
  };

  // Remove a book by id
  const handleDelete = (id) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  // Update a book in state
  const handleUpdate = (updated) => {
    setBooks(prev => prev.map(b => b.id === updated.id ? updated : b));
  };

  if (loading) return <p>Loading library…</p>;
  if (error)   return <p>{error}</p>;

  return (
    <div>
      <h1>My Library</h1>

      <AddBookForm onSuccess={handleNewBook} />

      {books.length === 0 ? (
        <p>No books in your library yet.</p>
      ) : (
        <div className="book-list">
          {books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
