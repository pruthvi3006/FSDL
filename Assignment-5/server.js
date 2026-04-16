const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const packageRoutes = require('./routes/packageRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = 3000;

const session = require('express-session');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add AFTER middleware
app.use(session({
    secret: 'travel_secret',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/travelDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use('/', packageRoutes);
app.use('/users', userRoutes);
app.use('/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});