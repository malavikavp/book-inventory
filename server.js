require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const booksRouter = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/book_inventory';

connectDB(MONGO_URI);

app.use(cors());
app.use(express.json());

app.use('/api/books', booksRouter);

app.get('/', (req, res) => res.send('Book Inventory API is running'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
