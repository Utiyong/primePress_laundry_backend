const mongoose = require('mongoose')


const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, 
        required: true
    },
    phoneNumber: {
        type: String, 
        trim: true,
        required: true
    },
    pickUpAddress: {
        type: String, 
        trim: true,
        required: true
    },
    pickUpDateAndTime: {
        type: String,
        trim: true,
        required: true
    },
    specialInstructions: {
        type: String, 
        trim: true
    }
}, {timeseries: true});

const bookingModel = mongoose.model('booking', bookingSchema)

module.exports = bookingModel