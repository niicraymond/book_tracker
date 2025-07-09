
import React, { useState, useEffect } from 'react';
import api from '../api';
import BookCard from '../components/BookCard';

export default function ReadingListPage() {
  const [books, setBooks]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [statusFilter, setStatusFilter] = useState('reading');

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get('/library', { params: { status: statusFilter } })
      .then(res => setBooks(res.data.books))
      .catch(err => {
        console.error(err);
        setError('Failed to load books');
      })
      .finally(() => setLoading(false));
  }, [statusFilter]);

  const handleDelete = (id) =>
    setBooks(prev => prev.filter(b => b.id !== id));

  const handleUpdate = (updated) => {
    if (updated.status !== statusFilter) {
      // If status changed out of current filter, remove it
      setBooks(prev => prev.filter(b => b.id !== updated.id));
    } else {
      setBooks(prev => prev.map(b => b.id === updated.id ? updated : b));
    }
  };

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>{error}</p>;

  return (
    <div className="reading-list-page">
      <h1>Your Reading Lists</h1>

      <div className="status-tabs" style={{ marginBottom: '1em' }}>
        {['not_started','reading','finished'].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              fontWeight: statusFilter === s ? 'bold' : 'normal',
              marginRight: '0.5em'
            }}
          >
            {s === 'not_started' ? 'To Read' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {books.length === 0 ? (
        <p>No books in this category.</p>
      ) : (
        <div className="book-list" style={{ display: 'grid', gap: '1em' }}>
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
