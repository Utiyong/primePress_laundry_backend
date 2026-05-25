const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String, 
    },
    otpExpiresAt: {
        type: Date,
        default:  () => new Date(Date.now() + (1000 * 5 * 60))
    },
    isVerfied:{
        type: Boolean,
        default: false
    }
   
}, {timestamps: true});

const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;