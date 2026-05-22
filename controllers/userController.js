const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/nodemailer');
const otpGenerator = require('otp-generator');
const {signUpTemplate} = require('../utils/emailTemplate');

exports.signUp = async (req, res, next) => {
    try {
        const userDetails = {
            fullName: req.body.fullName,
            emailAddress: req.body.emailAddress,
            // password: req.body.password,
            phoneNumber: `+234${req.body.phoneNumber}`
        };

        //  if ( userDetails.password !== req.body.confirmPassword) {
        //      return next({
        //          message: 'passswords do not match',
        //          statusCode: 400
        //      })
        // }

        const emailExists = await userModel.findOne({ email: userDetails.emailAddress });
        if (emailExists) {
            return next ({
                message: 'email already exists', 
                statusCode: 400
            });
        }

        const OTP = otpGenerator.generate(4, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        const expiresAt = new Date(Date.now() + 10 * 60000);
        const password = otpGenerator.generate(10, {upperCaseAlphabets: true, lowerCaseAlphabets: true, specialChars: true, digits: true});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            fullName: userDetails.fullName,
            emailAddress: userDetails.emailAddress,
            phoneNumber: userDetails.phoneNumber,
            otp: OTP,
            password: hashedPassword,
        });

        const data = {
            fullName: user.fullName,
            emailAddress: user.emailAddress,
            phoneNumber: user.phoneNumber,
            password: password
        };

        const emailOptions = {
            email: user.emailAddress,
            subject: 'Welcome to Viju Web App!!',
            html: signUpTemplate(user.fullName, OTP)
        };

        await sendMail(emailOptions);

        res.status(201).json({
            message: 'User created successfully',
            data
        });
    } catch (error) {
        next({
            message: error.message,
            statusCode: 500
        });
    }
};

exports.verifyEmail = async(req,res)=> {
    try {
       //extract the email and OTP from the request body
       const{emailAddress, otp} = req.body;
       //find the user trying to verify
       const user = await userModel.findOne({emailAddress})
       if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
       }
       if (new Date() > user.otpExpiresAt || user.otp != otp) {
        return res.status (400).json({
            message: 'Invalid OTP'
        })
       }

       //verify the user and delete the OTP
       user.isVerfied = true;
       user.otp = null
       user.otpExpiresAt = null

       await user.save()

       //send a success response
       res.status(200).json({
        message: 'User verified successfully'
       })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.resendOTP = async(req, res) => {
   try {
     const {emailAddress} = req.body;
    //find the user trying to verify
    const user = await userModel.findOne({emailAddress})
       if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
       }

       const OTP = otpGenerator.generate(4, {upperCaseAlphabets:false, lowerCaseAlphabets:false, specialChars:false});

        const expiresAt = new Date(Date.now() + 5 * 60000)

        user.otp = OTP;
        user.otpExpiresAt = expiresAt;

        const emailOptions = {
            email: user.emailAddress,
            subject: 'New OTP confirmation',
            html: signUpTemplate(user.fullName, OTP)
        }

        await sendMail(emailOptions)

        //save changes to the database
        await user.save()

        //send a success response
        res.status(200).json({
            message: 'OTP sent successfully'
        })
   } catch (error) {
    res.status(500).json({
        message: error.message
    })
   }
}

exports.getOneUser = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ id: req.params.id });
        if (!user) {
            return next({
                message: 'User not found',
                statusCode: 404
            });
        }
        res.status(200).json({
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        next({
            message: error.message,
            statusCode: 500
        });
    }
}

exports.getAllUsers = async(req, res, next) => {
    try {
        const users = await userModel.find().select('-password');
        if(!users){
            res.status(404).json({
                message: 'No users found'
            })
        }

        const data = users.map(user => ({
            fullName: user.fullName,
            emailAddress: user.emailAddress,
            phoneNumber: user.phoneNumber,
        }))

        res.status(200).json({
            message: 'All users fetched successfully',
            data
        })
    } catch (error) {
        next ({
            message: error.message,
            statusCode: 500
        })
    }
}

exports.login = async (req, res, next) => {
    try {
         const { emailAddress, password } = req.body

        const user = await userModel.findOne({emailAddress})
        if (!user) {
            return next({
                message: 'User not found',
                statusCode: 404
            })
        }

                  if (user.lockUntil && user.lockUntil > Date.now()) {
                    return next({
                        message: `Account locked until ${user.lockUntil}`,
                        statusCode: 403
                    })
                }
        
                 const passwordCorrect = await bcrypt.compare(password, user.password);
        
                if (!passwordCorrect) {
                    //increment login attempts and lock account if necessary
                    user.loginAttempts += 1;
                    if(user.loginAttempts >= 5) {
                        user.lockUntil = new Date(Date.now() + 30 * 60000);
                        user.loginAttempts = 0; // Reset login attempts after locking the account
                    }
                    await user.save();
                    return next({
                        message: 'Invalid credentials',
                        statusCode: 400
                    })
                }
        
                //reset login attempts on successful login
                user.loginAttempts = 0;
                await user.save();
        
       // const passwordCorrect = await bcrypt.compare(password, user.password);

        // if (!passwordCorrect) {
        //     return next({
        //         message: 'Invalid credentials',
        //         statusCode: 400
        //     })
        // }

        const token = await jwt.sign({ id: user._id, emailAddress: user.emailAddress }, process.env.JWT_SECRET, { expiresIn: '2days'});

        res.status(200).json({
            message: 'Login Successful',
            token
        })
    } catch (error) {
        next({
            message: error.message,
            statusCode: 500
        });
    }
}