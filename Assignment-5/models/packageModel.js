const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Domestic", "International"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    availableSeats: {
        type: Number,
        default: 50
    },
    rating: {
        type: Number,
        default: 4
    },
    startDate: Date,
    endDate: Date,
    itinerary: [String],
    inclusions: [String],
    exclusions: [String],
    isFeatured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["Available", "Sold Out"],
        default: "Available"
    }
}, 
{ timestamps: true }
);

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    travelDate: {
        type: Date,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ["Pending", "Confirmed", "Cancelled"],
        default: "Pending"
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Unpaid"],
        default: "Unpaid"
    }
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Package, Booking };
