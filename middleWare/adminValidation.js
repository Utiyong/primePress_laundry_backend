const joi = require('joi')

exports.signUpValidator = (req, res, next) =>{
    const schema = joi.object({
        fullName: joi.string().trim().pattern(/^[A-Za-z\s]{4,}$/).required().messages({
            'any.required': "Full Name is required",
            "string.empty": "Full name cannot be empty",
            'string.pattern.base': "Full name cannot contain numbers and must be at least 4 characters",
        }), 
        emailAddress:joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be valid'

        }),
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/).required().messages({
            'any.required': 'Password is required',
            'string.empty': 'password cannot be empty',
            'string.pattern.base': 'password must be at least 6 letters long and must include at least 1 upper case and lower case'
        }),
        confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
            'any.required': 'Confirm Password is required',
            'string.empty': 'Confirm Password cannot be empty',
            'any.only': 'Confirm Password must match Password'
        })
    })

    const { error} = schema.validate(req.body);
    //console.log(error.details[0])
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }


    next()
   
}

exports.verifyEmailValidator = (req, res, next) =>{
     const schema = joi.object({
    emailAddress:joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be valid'

        }),
        otp: joi.number().required().messages({
        'any.required': 'Otp is required',
        'number.base': 'Otp must be a number'
       })
   
    })
    const { error} = schema.validate(req.body);
    //console.log(error.details[0])
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }


    next()
}


exports.resendOTPValidator = (req, res, next) =>{
     const schema = joi.object({
    emailAddress:joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be valid'

        })
    })
    const { error} = schema.validate(req.body);
    //console.log(error.details[0])
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
   
}


exports.forgetPassValidator = (req, res, next) =>{
    const schema = joi.object({
    emailAddress:joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be valid'

        })
    })
    const { error} = schema.validate(req.body);
    //console.log(error.details[0])
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    next()
}

exports.resetPasswordValidator = (req, res, next) =>{
    const schema = joi.object({
    emailAddress:joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be valid'

        }),
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/).required().messages({
            'any.required': 'Password is required',
            'string.empty': 'password cannot be empty',
            'string.pattern.base': 'password must be at least 6 letters long and must include at least 1 upper case and lower case'
        })
    })

    const { error} = schema.validate(req.body);
    //console.log(error.details[0])
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    
    next()

}

exports.loginValidator = (req, res, next) =>{
    const schema = joi.object({
    emailAddress:joi.string().email().required().messages({
            'any.required': 'Email is required',
            'string.empty': 'Email cannot be empty',
            'string.email': 'Email must be valid'

        }),
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/).required().messages({
            'any.required': 'Password is required',
            'string.empty': 'password cannot be empty',
            'string.pattern.base': 'password must be at least 6 letters long and must include at least 1 upper case and lower case'
        })
    })
    const { error} = schema.validate(req.body);
    //console.log(error.details[0])
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    next()

}
