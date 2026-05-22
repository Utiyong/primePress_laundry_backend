const { signUp, getAllUsers, getOneUser, login, verifyEmail, resendOTP, forgetPass, resetPassword } = require('../controllers/adminController');

const router = require('express').Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name
 *           example: John Doe
 *         email:
 *           type: string
 *           description: User email address
 *           example: example@example.com
 *         password:
 *           type: string
 *           description: User password
 *           example: password123
 *         confirmPassword:
 *           type: string
 *           description: Confirm user password
 *           example: password123
 */


/**
 * @swagger
 * /api/v1/user/signUp:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign up a new user
 *     description: Sign up a new user with name, email,password and confirm password
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
 *               email:
 *                 type: string
 *                 description: User email address
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: password123
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm user password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User signed up successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: User signed up successfully
 */
router.post('/signUp', signUp)

/**
 * @swagger
 * /api/v1/user/getUsers:
 *   get:
 *     tags:
 *       - User
 *     summary: All users
 *     description: Get all users in the database
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The user ID
 *                         example: 60d0fe4f5311236168a109ca
 *                       fullName:
 *                         type: string
 *                         description: The user's full name
 *                         example: John Doe
 *                       emailAddress:
 *                         type: string
 *                         description: The user's email
 *                         example: example@example.com
 *                       accountNumber:
 *                         type: string
 *                         description: The user's account number
 *                         example: 1234567890
 *                       accountType:
 *                         type: string
 *                         description: The user's account type
 *                         example: savings
 *                       isVerified:
 *                         type: boolean
 *                         description: The user's verification status
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         description: The user's creation date
 *                         example: 2026-01-01T00:00:00.000Z
 *                       updatedAt:
 *                         type: string
 *                         description: The user's update date
 *                         example: 2026-01-01T00:00:00.000Z
 */
router.get('/getUsers',getAllUsers)

router.post('/verifyEmail', verifyEmail)
router.post('/resendOTP', resendOTP)
router.get('/getOneUser/:id', getOneUser)

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: login a user
 *     description: Login an existing user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email address
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: User logged in successfully
 */
router.post('/login', login)

router.post('/forget-password', forgetPass)

router.post('/reset-Password', resetPassword )


module.exports = router;