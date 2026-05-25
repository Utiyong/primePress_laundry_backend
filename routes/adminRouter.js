const { signUp, getAllUsers, getOneUser, login, verifyEmail, resendOTP, forgetPass, resetPassword } = require('../controllers/adminController');

const router = require('express').Router();

const {signUpValidator, verifyEmailValidator, resendOTPValidator, forgetPassValidator, resetPasswordValidator, loginValidator} = require('../middleWare/adminValidation');
const rateLimiter = require('../middleWare/rateLimiter');

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Admin's full name
 *           example: John Doe
 *         email:
 *           type: string
 *           description: Admin email address
 *           example: example@example.com
 *         password:
 *           type: string
 *           description: Admin password
 *           example: password123
 *         confirmPassword:
 *           type: string
 *           description: Confirm admin password
 *           example: password123
 */


/**
 * @swagger
 * /api/v1/admin/signUp:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Sign up a new admin
 *     description: Sign up a new admin with fullName, emailAddress and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Admin's full name
 *                 example: John Doe
 *               emailAddress:
 *                 type: string
 *                 description: Admin email address
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 description: Admin password
 *                 example: Password123
 *               confirmPassword:
 *                 type: string
 *                 description: Confirm admin password
 *                 example: Password123
 *     responses:
 *       201:
 *         description: Admin signed up successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: Admin signed up successfully
 */
router.post('/signUp', signUpValidator, signUp)

/**
 * @swagger
 * /api/v1/admin/getUsers:
 *   get:
 *     tags:
 *       - Admin
 *     summary: All admins in the database
 *     description: Get all admins in the database
 *     responses:
 *       200:
 *         description: List of admins
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
 * /api/v1/admin/verifyEmail:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Verify admin email
 *     description: Verify an admin's email address
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 description: Admin email address
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
 * /api/v1/admin/resendOTP:
 *   post:
 *     tags:
 *       - Admin
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
 *                 description: Admin email address
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
 * /api/v1/admin/getOneUser/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get an admin by ID
 *     description: Retrieve an admin by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The admin ID
 *         schema:
 *           type: string
 *           example: 69cc1f3183fdc152c944204f
 *     responses:
 *       200:
 *         description: The requested admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Admin'
 */
router.get('/getOneUser/:id', getOneUser)

/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     tags:
 *       - Admin
 *     summary: login an admin
 *     description: Login an existing admin with emailAddress and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 description: Admin email address
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 description: Admin password
 *                 example: password123
 *     responses:
 *       201:
 *         description: Admin logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: Admin logged in successfully
 */
router.post('/login', loginValidator, rateLimiter, login)

/** 
 * @swagger
 * /api/v1/admin/forget-password:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Request password reset
 *     description: Request a password reset for an admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 description: Admin email address
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
 * /api/v1/admin/reset-password:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Reset admin password
 *     description: Reset an admin's password with a valid token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the admin
 *                 example: Newpassword123
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