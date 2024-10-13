// models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    date: { type: Date, required: true },
    // Otros campos que necesites
});

module.exports = mongoose.model('Trip', tripSchema);
