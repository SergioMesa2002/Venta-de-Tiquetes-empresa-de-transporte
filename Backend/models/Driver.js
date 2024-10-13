// models/Driver.js
const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    // Otros campos que necesites
});

module.exports = mongoose.model('Driver', driverSchema);
