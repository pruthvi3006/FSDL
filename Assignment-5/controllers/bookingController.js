const { Booking, Package } = require("../models/packageModel");

exports.createBooking = async (req, res) => {
  try {
    // 1. Check login
    if (!req.session.user) {
      return res.redirect("/users/login");
    }

    const user = req.session.user;

    const { package: packageId, numberOfPeople, travelDate } = req.body;

    // 2. Get package
    const pkg = await Package.findById(packageId);

    if (!pkg) {
      return res.status(404).send("Package not found");
    }

    // 3. Calculate total
    const totalAmount = pkg.price * numberOfPeople;

    // 4. Create booking
    const booking = new Booking({
      user: user._id,
      package: packageId,
      numberOfPeople,
      totalAmount,
      travelDate,
    });

    await booking.save();

    res.redirect("/my-bookings");

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("package");

    res.render("pages/bookings", { bookings });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};