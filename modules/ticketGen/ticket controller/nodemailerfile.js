var nodemailer = require('nodemailer');
module.exports = function senddata(email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'deviprasadh.kvs@theotherfruit.com',
            pass: 'Qwerty.31245'
        }
    });


    var mailOptions = {
        from: 'deviprasadh.kvs@theotherfruit.com',
        to: email.toString(),
        subject: 'Test mail',
        text: 'Hello there!'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}