const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

router.get('/', packageController.getHomePage);
router.get('/packages', packageController.getPackagesPage);
router.get('/packages/:id', packageController.getPackageDetails);
router.get('/booking', packageController.getBookingPage);
router.get('/my-bookings', packageController.getMyBookings);

module.exports = router;