const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
    },
    // password: {
    //     type: String,
    //     required: true
    // },
    phoneNumber: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
}, {timestamps: true});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;