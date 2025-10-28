import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Box } from '@mui/material';
import api from '../api/axios';

export default function AddBookForm({ onAdd }) {
  const [form, setForm] = useState({
    title: '', author: '', genre: '', price: '', stock: 0, publishedYear: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, genre, price } = form;
    if (!title || !author || !genre || price === '') {
      alert('Please fill required fields');
      return;
    }
    setLoading(true);
    try {
      await api.post('/books', {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock) || 0,
        publishedYear: form.publishedYear ? Number(form.publishedYear) : undefined
      });
      setForm({ title: '', author: '', genre: '', price: '', stock: 0, publishedYear: '' });
      if (onAdd) onAdd();
    } catch (err) {
      console.error(err);
      alert('Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} required /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Author" name="author" value={form.author} onChange={handleChange} required /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Genre" name="genre" value={form.genre} onChange={handleChange} required /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Price" name="price" value={form.price} onChange={handleChange} required type="number" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Stock" name="stock" value={form.stock} onChange={handleChange} type="number" /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Published Year" name="publishedYear" value={form.publishedYear} onChange={handleChange} type="number" /></Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Book'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
