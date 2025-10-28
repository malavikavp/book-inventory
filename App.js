import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import api from './api/axios';

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Fetch books error', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Book Inventory
        </Typography>

        <AddBookForm onAdd={fetchBooks} />

        <Box mt={4}>
          <BookList books={books} onUpdated={fetchBooks} />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
