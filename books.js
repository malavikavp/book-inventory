const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// POST /api/books -> Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, price, stock, publishedYear } = req.body;
    if (!title || !author || !genre || price === undefined) {
      return res.status(400).json({ message: 'title, author, genre and price are required' });
    }
    const book = new Book({ title, author, genre, price, stock, publishedYear });
    await book.save();
    return res.status(201).json(book);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/books -> Get all books (sorted by createdAt desc)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/books/:id -> Update a book
router.put('/:id', async (req, res) => {
  try {
    const update = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    return res.json(book);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Update failed', error: err.message });
  }
});

// DELETE /api/books/:id -> Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    return res.json({ message: 'Book deleted', id: req.params.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
