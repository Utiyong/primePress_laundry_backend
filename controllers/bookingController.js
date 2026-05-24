const bookingModel = require('../modelS/booking')




exports.createBooking = async(req, res) =>{
    try{
        const {name,  phoneNumber, pickUpAddress, specialInstructions } = req.body

         const pickUpDateAndTime = new Date();

        const bookings = new bookingModel({
            name,
            phoneNumber, 
            pickUpAddress,
            pickUpDateAndTime,
            specialInstructions
        })

        // await bookings.save()

        res.status(201).json({
            message: 'successfully created a booking',
            data: bookings
        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message: 'something went wrong'
        })
    }
}