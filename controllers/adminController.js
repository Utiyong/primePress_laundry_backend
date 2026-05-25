const adminModel = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const sendMail = require('../utils/nodemailer');
const otpGenerator = require('otp-generator');
const {signUpTemplate} = require('../utils/emailTemplate');
const brevo = require('../utils/brevo')
const {signUpOtpTemplate, resendOtpTemplate, forgetPasswordTemplate, resetPasswordSuccessfulTemplate} = require('../utils/email')




exports.signUp = async (req, res, next) => {
    try {
        const userDetails = { 
            fullName: req.body.fullName,
            emailAddress: req.body.emailAddress,
            password: req.body.password
        };

        //  if ( userDetails.password !== req.body.confirmPassword) {
        //      return next({
        //          message: 'passswords do not match',
        //          statusCode: 400
        //      })
        // }

        const emailExists = await adminModel.findOne({ email: userDetails.emailAddress });
        if (emailExists) {
            return next ({
                message: 'email already exists', 
                statusCode: 400
            });
        }

        const OTP = otpGenerator.generate(6, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        console.log(OTP)

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userDetails.password, salt);

        const user = new adminModel({
            fullName: userDetails.fullName,
            emailAddress: userDetails.emailAddress,
            phoneNumber: userDetails.phoneNumber,
            otp: OTP,
            password: hashedPassword,

        });

        await user.save();


        const data = {
            fullName: user.fullName,
            emailAddress: user.emailAddress,
            phoneNumber: user.phoneNumber,
        };

         

         console.log(brevo)

    await brevo(user.emailAddress, user.fullName, OTP, signUpOtpTemplate(user.fullName, OTP));

        
        res.status(201).json({
            message: 'User created successfully',
            data: user
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
       const user = await adminModel.findOne({emailAddress})

       if (!user) {
        return res.status(404).json({
            message: 'User not found'
        })
       }

       if ( Date.now() > user.otpExpiresAt || user.otp != otp) {
        
        return res.status (400).json({
            message: 'Invalid OTP'
        })
       }

       //verify the user and delete the OTP
       user.isVerfied = true;
    //    user.otp = null
    //    user.otpExpiresAt = null

    //    await brevo(user.emailAddress, user.fullName, "Your email has been successfully verified. You can now log in to your account.")

       await user.save()

       //send a success response
       res.status(200).json({
        message: 'User verified successfully',
        data: user
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
    const user = await adminModel.findOne({emailAddress})
       if (!user) {
        return res.status(404).json({
            message: 'Admin not found'
        })
       }

       const OTP = otpGenerator.generate(6, {upperCaseAlphabets:false, lowerCaseAlphabets:false, specialChars:false});
       console.log(OTP)

       const expiresAt = new Date(Date.now() + 1000 * 60 * 5)


        user.otp = OTP;
        user.otpExpiresAt = expiresAt;
        

        

        

        //save changes to the database
        await user.save()
        await brevo(user.emailAddress, user.fullName, OTP, resendOtpTemplate(user.fullName, OTP))

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

exports.forgetPass = async(req, res) =>{
    try{
        const {emailAddress} = req.body

        const user = await adminModel.findOne({emailAddress: emailAddress.toLowerCase()})

        if(!user){
            return res.status(400).json({
                message: 'email not found'
            })
        }

        const OTP = otpGenerator.generate(6, {upperCaseAlphabets:false, lowerCaseAlphabets:false, specialChars:false});


        //  const expiresAt = new Date(Date.now() + 1000 * 60 * 5)
        //  user.otpExpiresAt = expiresAt;
         user.otp = OTP;
        //  if(Date.now() > user.otpExpiresAt || OTP != user.otp){
        //     return res.status(400).json({
        //         message: "invalid Otp"
        //     })
        //  }


        //  const salt = await bcrypt.genSalt(10)
        //  const hashPassword = await bcrypt.hash(password, salt)

        //  user.password = hashPassword

         await user.save()
         
         const data = {
            name: user.fullName,
            otp: user.otp
         }

        await brevo(user.emailAddress, user.fullName, OTP, forgetPasswordTemplate(user.fullName, OTP))

      res.status(200).json({
        message: 'successfully forgotten Password',
        data
      })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message: 'something went wrong'
        })


    }
}


exports.resetPassword = async(req, res) =>{
    try{
        const {emailAddress, password} = req.body

        const checkEmail = await adminModel.findOne({emailAddress: emailAddress.toLowerCase()})

        if(!checkEmail){
            return res.status(404).json({
                message: 'email not found'
            })
        }

        const passwordCorrect = await bcrypt.compare(password, checkEmail.password);
        if(passwordCorrect){
            return res.status(404).json({
                message: 'please enter a new Password'
            }) 
        }
        

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        checkEmail.password = hashPassword
        await checkEmail.save()

        await brevo(checkEmail.emailAddress, checkEmail.fullName, null, resetPasswordSuccessfulTemplate(checkEmail.fullName))

        res.status(200).json({
            message: 'successfully reset password'
        })


    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message: 'something went wrong'
        })

    }
}



exports.getOneUser = async (req, res, next) => {
    try {
        const user = await adminModel.findOne({ id: req.params.id });
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
        const users = await adminModel.find().select('-password');
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

        const user = await adminModel.findOne({emailAddress})
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