const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: 'singh.deependra793@gmail.com',
  from: 'donotreply@theotherfruit.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'Hi there!!',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);


// var helper = require('sendgrid').mail;
// const async = require('async');


// function sendEmail(
//     parentCallback,
//     fromEmail,
//     toEmails,
//     subject,
//     textContent,
//     htmlContent
//   ) {
//     const errorEmails = [];
//     const successfulEmails = [];
//      const sg = require('sendgrid')('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');
//      async.parallel([
//       function(callback) {
//         // Add to emails
//         for (let i = 0; i < toEmails.length; i += 1) {
//           // Add from emails
//           const senderEmail = new helper.Email(fromEmail);
//           // Add to email
//           const toEmail = new helper.Email(toEmails[i]);
//           // HTML Content
//           const content = new helper.Content('text/html', htmlContent);
//           const mail = new helper.Mail(senderEmail, subject, toEmail, content);
//           var request = sg.emptyRequest({
//             method: 'POST',
//             path: '/v3/mail/send',
//             body: mail.toJSON()
//           });
//           sg.API(request, function (error, response) {
//             console.log('SendGrid');
//             if (error) {
//               console.log('Error response received');
//             }
//             console.log(response.statusCode);
//             console.log(response.body);
//             console.log(response.headers);
//           });
//         }
//         // return
//         callback(null, true);
//       }
//     ], function(err, results) {
//       console.log('Done');
//     });
//     parentCallback(null,
//       {
//         successfulEmails: successfulEmails,
//         errorEmails: errorEmails,
//       }
//     );
// }

// module.exports = (app) => {
//   app.post('/api/send', function (req, res, next) {
//   async.parallel([
//       function (callback) {
//           sendEmail(
//           callback,
//           'deviprasadh.kvs@theotherfruit.com',
//           'kvsdeviprasad859@gmail.com',
//           'Subject Line',
//           'Text Content',
//           '<p style="font-size: 32px;">HTML Content</p>'
//         );
//       }
//     ], function(err, results) {
//       res.send({
//       success: true,
//       message: 'Emails sent',
//       successfulEmails: results[0].successfulEmails,
//       errorEmails: results[0].errorEmails,
//       });
//     });
//   });
// };