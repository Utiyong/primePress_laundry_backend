const nodemailer = require('nodemailer');

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpHost = process.env.SMTP_HOST;
const smtpService = process.env.SMTP_SERVICE;

if (!smtpUser || !smtpPass) {
    throw new Error('Missing SMTP_USER or SMTP_PASS environment variables');
}

const transporter = nodemailer.createTransport({
    service: smtpService || 'gmail',
    host: smtpHost,
    port: 465,
    secure: true,
    auth: {
        user: smtpUser,
        pass: smtpPass,
    },
});

const sendMail = async (options) => {
    try {
        const info = await transporter.sendMail({
            from: `"CHIOMA" <${process.env.SMTP_USER}>`,
            to: options.email,
            subject: options.subject,
            html: options.html,
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Message sent to: %s", options.email);
    } catch (error) {
        console.log("Error while sending mail:", error.message);
    }
}

module.exports = sendMail;