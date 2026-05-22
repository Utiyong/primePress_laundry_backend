const BrevoClient = require('@getbrevo/brevo')

const {resetPasswordSuccessfulTemplate, signUpOtpTemplate} = require('./email')

const brevoClient = new BrevoClient.TransactionalEmailsApi()
brevoClient.authentications['apiKey'].apiKey = process.env.brevoapikey;


const brevo = async(userEmail, userName, otp, template) =>{
    try{
        const sendSmtpEmails = new BrevoClient.SendSmtpEmail();

        sendSmtpEmails.to = [{email: userEmail}]
        sendSmtpEmails.subject = "Hello from PrimePress_Laundry"
        sendSmtpEmails.htmlContent  =  template
        sendSmtpEmails.sender = { email: "utibeekpenyong203@gmail.com", name: "IT team for primePress Laundry"}

        await brevoClient.sendTransacEmail(sendSmtpEmails);

        console.log("email sent to", userEmail)


    }
    catch(error){
        console.log("brevo error:",  error.message)

    }
}

module.exports = brevo





