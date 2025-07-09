import React, { useState } from 'react';
import api from '../api';

export default function BookCard({ book, onDelete, onUpdate }) {
  const [updating, setUpdating] = useState(false);
  const [status, setStatus]   = useState(book.status || 'not_started');

  const handleDelete = async () => {
    await api.delete(`/library/${book.id}`);
    onDelete(book.id);
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    const res = await api.patch(`/library/${book.id}`, { status: newStatus });
    onUpdate(res.data.book);
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>By {book.authors.join(', ')}</p>
      <select value={status} onChange={handleStatusChange}>
        <option value="not_started">To Read</option>
        <option value="reading">Reading</option>
        <option value="finished">Finished</option>
      </select>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
