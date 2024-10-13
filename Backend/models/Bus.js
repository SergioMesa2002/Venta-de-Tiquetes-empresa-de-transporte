// models/Bus.js
const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    plate: { type: String, required: true },
    driver: { type: String, required: true },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
});

module.exports = mongoose.model('Bus', busSchema);
