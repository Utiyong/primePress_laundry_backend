const { signUp, getAllUsers, getOneUser, login, verifyEmail, resendOTP, forgetPass, resetPassword } = require('../controllers/adminController');

const router = require('express').Router();

const {signUpValidator, verifyEmailValidator, resendOTPValidator, forgetPassValidator, resetPasswordValidator, loginValidator} = require('../middleWare/adminValidation')

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
 *     description: Sign up a new user with fullName, emailAddress and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: User's full name
 *                 example: John Doe
 *               emailAddress:
 *                 type: string
 *                 description: User email address
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: Password123
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm user password
 *                 example: Password123
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
router.post('/signUp', signUpValidator, signUp)

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
 *                       password:
 *                         type: string
 *                         description: The user's password
 *                         example: Password123
 *                       confirmPassword:
 *                         type: string
 *                         description: The user's password
 *                         example: Password123
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

/** 
 * @swagger
 * /api/v1/user/verifyEmail:
 *   post:
 *     tags:
 *       - User
 *     summary: Verify user email
 *     description: Verify a user's email address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 description: User email address
 *                 example: example@example.com
 *               otp:
 *                 type: string
 *                 description: One-Time Password for verification
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: Email verified successfully
 */
router.post('/verifyEmail', verifyEmail)

/** 
 * @swagger
 * /api/v1/user/resendOTP:
 *   post:
 *     tags:
 *       - User
 *     summary: Resend OTP
 *     description: Resend a new one-time password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 description: User email address
 *                 example: example@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: OTP sent successfully
 */
router.post('/resendOTP', resendOTP)

/** 
 * @swagger
 * /api/v1/user/getOneUser/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a user by ID
 *     description: Retrieve a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *           example: 69cc1f3183fdc152c944204f
 *     responses:
 *       200:
 *         description: The requested user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */
router.get('/getOneUser/:id', getOneUser)

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: login a user
 *     description: Login an existing user with emailAddress and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
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
router.post('/login', loginValidator, login)

/** 
 * @swagger
 * /api/v1/user/forget-password:
 *   post:
 *     tags:
 *       - User
 *     summary: Request password reset
 *     description: Request a password reset for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 description: User email address
 *                 example: example@example.com
 *     responses:
 *       200:
 *         description: Password reset requested successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: Password reset requested successfully
 */
router.post('/forget-password', forgetPass)

/** 
 * @swagger
 * /api/v1/user/reset-password:
 *   post:
 *     tags:
 *       - User
 *     summary: Reset user password
 *     description: Reset a user's password with a valid token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: Password reset successfully
 */
router.post('/reset-Password', resetPassword )


module.exports = router;