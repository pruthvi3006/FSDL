const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/cart', require('./routes/cart'));

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/items', (req, res) => {
  res.sendFile(__dirname + '/views/items.html');
});

app.get('/item-detail', (req, res) => {
  res.sendFile(__dirname + '/views/item-detail.html');
});

app.get('/sell', (req, res) => {
  res.sendFile(__dirname + '/views/sell.html');
});

app.get('/my-items', (req, res) => {
  res.sendFile(__dirname + '/views/my-items.html');
});

app.get('/cart', (req, res) => {
  res.sendFile(__dirname + '/views/cart.html');
});

app.get('/profile', (req, res) => {
  res.sendFile(__dirname + '/views/profile.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
