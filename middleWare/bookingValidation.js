const joi = require('joi')

exports.createBooksValidation = (req, res, next) =>{
    const schema = joi.object({
        name: joi.string().trim().pattern(/^[A-Za-z\s]{4,}$/).required().messages({
            'any.required': "Full Name is required",
            "string.empty": "Full name cannot be empty",
            'string.pattern.base': "Full name cannot contain numbers and must be at least 4 characters",
        }), 
        phoneNumber: joi.string().pattern(/^\d{11}$/).required().messages({
            'any.required': 'Phone Number is required',
            'string.empty': 'phone Number cannot be empty',
            'string.pattern.base': 'phone number must contain 11 digits'
        }),
        pickUpAddress: joi.string().required().messages({
            'any.required': 'pickUpAddress is required',
            'string.empty': 'pickUpAddress cannot be empty'
        }),
        pickUpDateAndTime: joi.string().required().messages({
            'any.required': 'pickUp Date And Time is required',
            'string.empty': 'pickUp Date And Time cannot be empty'
        }),
        specialInstructions: joi.string().required().messages({
            'any.required': 'special Instructions is required',
            'string.empty': 'special Instructions cannot be empty'
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