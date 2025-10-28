import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import api from '../api/axios';

export default function EditBookModal({ book, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: book.title || '',
    author: book.author || '',
    genre: book.genre || '',
    price: book.price || 0,
    stock: book.stock || 0,
    publishedYear: book.publishedYear || ''
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/books/${book._id}`, {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        publishedYear: form.publishedYear ? Number(form.publishedYear) : undefined
      });
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Book</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}><TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} /></Grid>
          <Grid item xs={12}><TextField fullWidth label="Author" name="author" value={form.author} onChange={handleChange} /></Grid>
          <Grid item xs={12}><TextField fullWidth label="Genre" name="genre" value={form.genre} onChange={handleChange} /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Price" name="price" value={form.price} onChange={handleChange} type="number" /></Grid>
          <Grid item xs={6}><TextField fullWidth label="Stock" name="stock" value={form.stock} onChange={handleChange} type="number" /></Grid>
          <Grid item xs={12}><TextField fullWidth label="Published Year" name="publishedYear" value={form.publishedYear} onChange={handleChange} type="number" /></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
      </DialogActions>
    </Dialog>
  );
}
