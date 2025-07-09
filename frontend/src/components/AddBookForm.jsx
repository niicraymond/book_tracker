import React, { useState } from 'react';
import api from '../api';

export default function AddBookForm({ onSuccess }) {
  const [googleId, setGoogleId] = useState('');
  const [status, setStatus]   = useState('not_started');
  const [error, setError]     = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/library', { google_id: googleId, status });
      onSuccess(res.data.book);
      setGoogleId('');
      setError(null);
    } catch (err) {
      setError('Failed to add book');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={googleId}
        onChange={e => setGoogleId(e.target.value)}
        placeholder="Google Books ID"
        required
      />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="not_started">To Read</option>
        <option value="reading">Reading</option>
        <option value="finished">Finished</option>
      </select>
      <button type="submit">Add Book</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
