const express = require('express')

const router = express.Router()

const {createBooking, getAllBookings, getOneBook} = require('../controllers/bookingController')

const {createBooksValidation} = require('../middleWare/bookingValidation')

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name
 *           example: John Doe
 *         phoneNumber:
 *           type: string
 *           description: User phone number
 *           example: +1234567890
 *         pickUpAddress:
 *           type: string
 *           description: The address where the laundry will be picked up
 *           example: 123 Main St, Anytown, USA
 *         pickUpDateAndTime:
 *           type: string
 *           description: The date and time when the laundry will be picked up      
 *           example: 2023-10-10
 *         specialInstructions:
 *           type: string
 *           description: Any special instructions for the booking
 *           example: Please leave at the back door
 */

/** 
 * @swagger
 * /api/v1/booking/book:
 *   post:
 *     tags:
 *       - Booking
 *     summary: Create a new booking
 *     description: Create a new booking with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *                 example: John Doe
 *               phoneNumber:
 *                 type: string
 *                 description: User phone number
 *                 example: +1234567890
 *               pickUpAddress:
 *                 type: string
 *                 description: The address where the laundry will be picked up
 *                 example: 123 Main St, Anytown, USA
 *               pickUpDateAndTime:
 *                 type: string
 *                 description: The date and time when the laundry will be picked up      
 *                 example: 2023-10-10
 *               specialInstructions:
 *                 type: string
 *                 description: Any special instructions for the booking
 *                 example: Please leave at the back door
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: Booking created successfully
 */
router.post('/book', createBooksValidation, createBooking)

/** 
 * @swagger
 * /api/v1/booking/allbooks:
 *   get:
 *     tags:
 *       - Booking
 *     summary: Get all bookings
 *     description: Retrieve a list of all bookings
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking'
 */
router.get('/allbooks', getAllBookings)

/** 
 * @swagger
 * /api/v1/booking/getOneBook/{id}:
 *   get:
 *     tags:
 *       - Booking
 *     summary: Get a booking by ID
 *     description: Retrieve a booking by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The booking ID
 *         schema:
 *           type: string
 *           example: 69cc1f3183fdc152c944204f
 *     responses:
 *       200:
 *         description: The requested booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
*                   $ref: '#/components/schemas/Booking'
 */
router.get('/getOneBook/:id', getOneBook)

module.exports = router
