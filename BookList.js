import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Paper, TableContainer, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditBookModal from './EditBookModal';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import api from '../api/axios';

export default function BookList({ books, onUpdated }) {
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h6">All Books ({books.length})</Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Published</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(b => (
              <TableRow key={b._id}>
                <TableCell>{b.title}</TableCell>
                <TableCell>{b.author}</TableCell>
                <TableCell>{b.genre}</TableCell>
                <TableCell>{b.price}</TableCell>
                <TableCell>{b.stock}</TableCell>
                <TableCell>{b.publishedYear || '-'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditing(b)}><EditIcon /></IconButton>
                  <IconButton onClick={() => setDeleting(b)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {books.length === 0 && (
              <TableRow><TableCell colSpan={7}><Typography align="center">No books found</Typography></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {editing && <EditBookModal book={editing} onClose={() => setEditing(null)} onUpdated={onUpdated} />}
      {deleting && (
        <DeleteConfirmDialog
          open={Boolean(deleting)}
          onClose={() => setDeleting(null)}
          onConfirm={() => { handleDelete(deleting._id); setDeleting(null); }}
          title={`Delete "${deleting.title}"?`}
        />
      )}
    </Paper>
  );
}
