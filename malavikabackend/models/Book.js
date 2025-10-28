const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'] },
  author: { type: String, required: [true, 'Author is required'] },
  genre: { type: String, required: [true, 'Genre is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  stock: { type: Number, default: 0 },
  publishedYear: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);
