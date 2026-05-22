exports.emailTemplate = (fullname, otp)=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email verification</title>
</head>
<body style = "width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center">
    <div style = "color: blue; align-items:center; justify-content: center;"><h1>Email OTP verification</h1></div>
    <div class = ""><h2>Hello ${fullname}</h2></div>
    <div class = "bodydiv"><P>Below is your one
         time passcode that you need to use to complete your authentication. <br>
         The verification code will be valid for 30 minutes. Please do not share this code with anyone </P>
        </div>  
        <div class = "otp" style = "color: blue">${otp}</div>

        <div class = "bottombody"><p>If you are experiencing issues with your account, please don't hesitate to contact us. 
            <br> Enjoy the fastest and most secure way to buy airtime. Mobile data and to pay bills. 
        </p></div>
        <div class = "footerdiv"><p>If you would like to know more about our services, please also reach out to our team.</p></div>
    
</body>
</html>`
}


exports.resetPasswordSuccessfulTemplate = (name) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; border-radius: 0px !important; }
            .content { padding: 30px 20px !important; }
            .cta-button { width: 100% !important; box-sizing: border-box; text-align: center; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <center>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f7f6;">
            <tr>
                <td align="center" style="padding: 40px 10px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="container" style="width: 100%; max-width: 500px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">

                        <!-- Header -->
                        <tr>
                            <td align="center" style="padding: 30px 20px; background-color: #ffffff; border-bottom: 1px solid #eeeeee;">
                                <h1 style="margin: 0; color: #00d2ff; font-size: 24px; font-weight: 800; letter-spacing: 1px;">PrimePress Laundry</h1>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td class="content" style="padding: 40px; text-align: center; color: #333333;">

                                <!-- Icon -->
                                <div style="margin-bottom: 20px; font-size: 50px; color: #10b981;">&#10003;</div>

                                <h2 style="margin: 0 0 10px; font-size: 22px; font-weight: 700; color: #1a1a1a;">Password Reset Successful</h2>
                                <p style="font-size: 16px; line-height: 1.5; margin: 0 0 30px; color: #666666;">
                                    Hi ${name}, your password for <strong>PrimePress Laundry</strong> has been successfully updated. You can now log back into your account using your new credentials.
                                </p>

                                <!-- CTA Button -->
                                <a href="https://primepress.app" class="cta-button" style="display: inline-block; background-color: #00d2ff; color: #ffffff; padding: 16px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                                    Log In to PrimePress Laundry
                                </a>

                                <!-- Warning -->
                                <p style="font-size: 13px; color: #999999; margin-top: 40px; line-height: 1.4; border-top: 1px solid #f3f4f6; padding-top: 20px;">
                                    <strong>Didn't do this?</strong> If you did not reset your password, please secure your account immediately by contacting our support team.
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="padding: 25px; background-color: #fafafa; font-size: 12px; color: #aaaaaa;">
                                <p style="margin: 0;">&copy; 2026 PrimePress Laundry App. All rights reserved.</p>
                                <p style="margin: 8px 0 0;">
                                    <a href="#" style="color: #00d2ff; text-decoration: none;">Security Settings</a> &bull;
                                    <a href="#" style="color: #00d2ff; text-decoration: none;">Contact Support</a>
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`
}

exports.signUpOtpTemplate = (name, otp) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; border-radius: 0px !important; }
            .content { padding: 30px 20px !important; }
            .otp-box { font-size: 32px !important; letter-spacing: 10px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <center>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f7f6;">
            <tr>
                <td align="center" style="padding: 40px 10px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="container" style="width: 100%; max-width: 500px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">

                        <!-- Header -->
                        <tr>
                            <td align="center" style="padding: 30px 20px; background-color: #ffffff; border-bottom: 1px solid #eeeeee;">
                                <h1 style="margin: 0; color: #00d2ff; font-size: 24px; font-weight: 800; letter-spacing: 1px;">PrimePress Laundry</h1>
                            </td>
                        </tr>

                        <!-- OTP Content -->
                        <tr>
                            <td class="content" style="padding: 40px; text-align: center; color: #333333;">

                                <!-- Icon -->
                                <div style="margin-bottom: 20px; font-size: 50px;">&#9993;</div>

                                <h2 style="margin: 0 0 10px; font-size: 22px; font-weight: 700; color: #1a1a1a;">Verify Your Email</h2>
                                <p style="font-size: 16px; line-height: 1.5; margin: 0 0 30px; color: #666666;">
                                    Hi ${name}, welcome to <strong>PrimePress Laundry</strong>! Use the OTP below to verify your email address and complete your sign up.
                                </p>

                                <!-- OTP Box -->
                                <div style="display: inline-block; background-color: #f0fbff; border: 2px dashed #00d2ff; border-radius: 12px; padding: 20px 40px; margin-bottom: 30px;">
                                    <p style="margin: 0 0 6px; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">Your One-Time Password</p>
                                    <p class="otp-box" style="margin: 0; font-size: 40px; font-weight: 800; letter-spacing: 14px; color: #00d2ff;">${otp}</p>
                                </div>

                                <p style="font-size: 14px; color: #999999; margin: 0 0 10px;">This OTP expires in <strong style="color: #1a1a1a;">10 minutes</strong>.</p>

                                <!-- Warning -->
                                <p style="font-size: 13px; color: #999999; margin-top: 30px; line-height: 1.4; border-top: 1px solid #f3f4f6; padding-top: 20px;">
                                    <strong>Didn't create an account?</strong> You can safely ignore this email. Someone may have entered your email by mistake.
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="padding: 25px; background-color: #fafafa; font-size: 12px; color: #aaaaaa;">
                                <p style="margin: 0;">&copy; 2026 PrimePress Laundry App. All rights reserved.</p>
                                <p style="margin: 8px 0 0;">
                                    <a href="#" style="color: #00d2ff; text-decoration: none;">Security Settings</a> &bull;
                                    <a href="#" style="color: #00d2ff; text-decoration: none;">Contact Support</a>
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`
}


exports.forgetPasswordTemplate = (name, otp) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; border-radius: 0px !important; }
            .content { padding: 30px 20px !important; }
            .otp-box { font-size: 32px !important; letter-spacing: 10px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <center>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f7f6;">
            <tr>
                <td align="center" style="padding: 40px 10px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="container" style="width: 100%; max-width: 500px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">

                        <!-- Header -->
                        <tr>
                            <td align="center" style="padding: 30px 20px; background-color: #ffffff; border-bottom: 1px solid #eeeeee;">
                                <h1 style="margin: 0; color: #00d2ff; font-size: 24px; font-weight: 800; letter-spacing: 1px;">PrimePress Laundry</h1>
                            </td>
                        </tr>

                        <!-- OTP Content -->
                        <tr>
                            <td class="content" style="padding: 40px; text-align: center; color: #333333;">

                                <!-- Icon -->
                                <div style="margin-bottom: 20px; font-size: 50px;">&#128274;</div>

                                <h2 style="margin: 0 0 10px; font-size: 22px; font-weight: 700; color: #1a1a1a;">Reset Your Password</h2>
                                <p style="font-size: 16px; line-height: 1.5; margin: 0 0 30px; color: #666666;">
                                    Hi ${name}, we received a request to reset your <strong>PrimePress Laundry</strong> password. Use the OTP below to proceed. If you didn't request this, you can safely ignore this email.
                                </p>

                                <!-- OTP Box -->
                                <div style="display: inline-block; background-color: #fff5f5; border: 2px dashed #ff6b6b; border-radius: 12px; padding: 20px 40px; margin-bottom: 30px;">
                                    <p style="margin: 0 0 6px; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">Your One-Time Password</p>
                                    <p class="otp-box" style="margin: 0; font-size: 40px; font-weight: 800; letter-spacing: 14px; color: #ff6b6b;">${otp}</p>
                                </div>

                                <p style="font-size: 14px; color: #999999; margin: 0 0 10px;">This OTP expires in <strong style="color: #1a1a1a;">10 minutes</strong>.</p>

                                <!-- Warning -->
                                <p style="font-size: 13px; color: #999999; margin-top: 30px; line-height: 1.4; border-top: 1px solid #f3f4f6; padding-top: 20px;">
                                    <strong>Didn't request this?</strong> Your account may be at risk. Please contact our support team immediately.
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="padding: 25px; background-color: #fafafa; font-size: 12px; color: #aaaaaa;">
                                <p style="margin: 0;">&copy; 2026 PrimePress Laundry App. All rights reserved.</p>
                                <p style="margin: 8px 0 0;">
                                    <a href="#" style="color: #00d2ff; text-decoration: none;">Security Settings</a> &bull;
                                    <a href="#" style="color: #00d2ff; text-decoration: none;">Contact Support</a>
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`
}


exports.resendOtpTemplate = (name, otp) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your New OTP</title>
    <style>
        @media screen and (max-width: 600px) {
            .container { width: 100% !important; border-radius: 0px !important; }
            .content { padding: 30px 20px !important; }
            .otp-box { font-size: 32px !important; letter-spacing: 10px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <center>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f7f6;">
            <tr>
                <td align="center" style="padding: 40px 10px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="container" style="width: 100%; max-width: 500px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">

                        <!-- Header -->
                        <tr>
                            <td align="center" style="padding: 30px 20px; background-color: #ffffff; border-bottom: 1px solid #eeeeee;">
                                <h1 style="margin: 0; color: #00d2ff; font-size: 24px; font-weight: 800; letter-spacing: 1px;">PrimePress Laundry</h1>
                            </td>
                        </tr>

                        <!-- OTP Content -->
                        <tr>
                            <td class="content" style="padding: 40px; text-align: center; color: #333333;">

                                <!-- Icon -->
                                <div style="margin-bottom: 20px; font-size: 50px;">&#128260;</div>

                                <h2 style="margin: 0 0 10px; font-size: 22px; font-weight: 700; color: #1a1a1a;">Here's Your New OTP</h2>
                                <p style="font-size: 16px; line-height: 1.5; margin: 0 0 30px; color: #666666;">
                                    Hi ${name}, you requested a new OTP for your <strong>PrimePress Laundry</strong> account. Use the code below to complete your verification.
                                </p>

                                <!-- OTP Box -->
                                <div style="display: inline-block; background-color: #f0fbff; border: 2px dashed #00d2ff; border-radius: 12px; padding: 20px 40px; margin-bottom: 30px;">
                                    <p style="margin: 0 0 6px; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">Your New One-Time Password</p>
                                    <p class="otp-box" style="margin: 0; font-size: 40px; font-weight: 800; letter-spacing: 14px; color: #00d2ff;">${otp}</p>
                                </div>

                                <p style="font-size: 14px; color: #999999; margin: 0 0 10px;">This OTP expires in <strong style="color: #1a1a1a;">5 minutes</strong>.</p>

                                <!-- Warning -->
                                <p style="font-size: 13px; color: #999999; margin-top: 30px; line-height: 1.4; border-top: 1px solid #f3f4f6; padding-top: 20px;">
                                    <strong>Didn't request this?</strong> Please contact our support team immediately.
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="padding: 25px; background-color: #fafafa; font-size: 12px; color: #aaaaaa;">
                                <p style="margin: 0;">&copy; 2026 PrimePress Laundry App. All rights reserved.</p>
                                <p style="margin: 8px 0 0;">
                                    <a href="#" style="color: #00d2ff; text-decoration: none;">Security Settings</a> &bull;
                                    <a href="#" style="color: #00d2ff; text-decoration: none;">Contact Support</a>
                                </p>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>`
}