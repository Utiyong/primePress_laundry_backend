const express = require('express')

const router = express.Router()

const {createBooking, getAllBookings, getOneBook} = require('../controllers/bookingController')

router.post('/book', createBooking)

router.get('/allbooks', getAllBookings)

router.get('/getOneBook/:id', getOneBook)

module.exports = router
