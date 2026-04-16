const { Package, Booking } = require('../models/packageModel');

exports.getHomePage = async (req, res) => {
    try {
        const packages = await Package.find().limit(3);
        res.render('pages/home', { packages });
    } catch (err) {
        res.status(500).send("Server Error: " + err.message);
    }
};

exports.getPackagesPage = async (req, res) => {
    try {
        const packages = await Package.find();
        res.render('pages/packages', { packages });
    } catch (err) {
        res.status(500).send("Server Error: " + err.message);
    }
};

exports.getPackageDetails = async (req, res) => {
    try {
        const packageData = await Package.findById(req.params.id);
        res.render('pages/packageDetails', { package: packageData });
    } catch (err) {
        res.status(500).send("Server Error: " + err.message);
    }
};

exports.getBookingPage = async (req, res) => {
    try {
        const packageId = req.query.package;
        res.render('pages/booking', { packageId });
    } catch (err) {
        res.status(500).send("Server Error: " + err.message);
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/users/login');
        }

        const bookings = await Booking.find({ user: req.session.user._id })
            .populate('package');

        res.render('pages/myBookings', { bookings });

    } catch (err) {
        res.send(err.message);
    }
};