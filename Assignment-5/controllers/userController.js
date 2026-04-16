const User = require('../models/userModel');

// Register user
exports.registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Show login page
exports.showLoginPage = (req, res) => {
    res.render('pages/login');
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, name } = req.body;

    try {
        let user = await User.findOne({ email });

        // If NOT exists → create user
        if (!user) {
            user = await User.create({ name, email });
        }

        // Store user in session
        req.session.user = user;

        res.redirect('/');

    } catch (err) {
        res.send(err.message);
    }
};

// Logout
exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};