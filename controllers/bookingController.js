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

        await bookings.save()

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



exports.getAllBookings = async(req, res, next) => {
    try {
        const users = await bookingModel.find()

        
        
        res.status(200).json({
            message: 'All users fetched successfully',
            data: users
        })

    } catch (error) {
        next ({
            message: error.message,
            statusCode: 500
        })
    }
}


exports.getOneBook = async (req, res, next) => {
    try {
        const {id} = req.params
        const book = await bookingModel.findById(id)
        if (!book) {
            return next({
                message: 'booking not found',
                statusCode: 404
            });
        }
        res.status(200).json({
            message: 'booking retrieved successfully',
            data: book
        });
    } catch (error) {
        next({
            message: error.message,
            statusCode: 500
        });
    }
}
