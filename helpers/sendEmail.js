function sendEmail(email, message) {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'micahaelfoo@gmail.com',
        pass: 'testadmin1234'
    }
    });

    const mailOptions = {
    from: 'micahaelfoo@gmail.com',
    to: email,
    subject: "Success Create Account",
    text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}

module.exports = sendEmail;