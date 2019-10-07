var api_key = '4b8d530d78d18ef5456a410530812cbf-c50f4a19-537c49b7';
var domain = 'sandboxbd736e86f9a84845a8ea289de3f82ebc.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: 'deviprasadh.kvs@theotherfruit.com',
  to: 'kvsdeviprasadh859@gmail.com',
  subject: 'TEST',
  text: 'Testing!'
};
 
mailgun.messages().send(data, function (error, body) {
  if (error){
    console.log(error);
  }
  console.log(body, "body");
});

