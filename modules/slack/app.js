// require('dotenv').config();
// const client = require('twilio')();

// client.messages.create({
//   from: 'whatsapp:+14155238886',
//   body: 'Ahoy world!',
//   to: 'whatsapp:+918019189175'
// }).then(message => console.log(message.sid));

var MY_SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
var slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

function sendSlackNotification(cpu_usage, memory_usuage){
    
    
    slack.send({
      channel: '#internaldev',
      //directmessage: 'Manikanta Devanaboyina',
      icon_emoji: ':computer:',
      username: 'Devi Prasadh',
      text: 'Here is my notification',
      unfurl_links: 5,
      fields: {
        'CPU usage': cpu_usage,
        'Memory usage': memory_usuage
      }
    });
}

// sendSlackNotification('68.26%', '3560mb');


// Bundled notification types:
 
// slack.bug('Something bad happened!'); // Posts to #bugs by default
// slack.success('Something good happened!'); // Posts to #alerts by default
// slack.alert('Something important happened!'); // Posts to #alerts by default
// slack.note('Here is a note.'); // Posts to #alerts by default
 
// Send custom fields which are nicely displayed by the Slack client:
 
// slack.alert({
//   text: 'Current server stats',
//   fields: {
//     'CPU usage': '7.51%',
//     'Memory usage': '254mb'
//   }
// });
 
// // The `fields` object is custom shorthand for the `attachments` array:
 
// slack.alert({
//   text: 'Current server stats',
//   attachments: [
//     {
//       fallback: 'Required Fallback String',
//       fields: [
//         { title: 'CPU usage', value: '7.51%', short: true },
//         { title: 'Memory usage', value: '254mb', short: true }
//       ]
//     }
//   ]
// });
 
// Everything is overridable:
 


// app.get('/sendSlackNotification', (req, res)=>{
//      cpu_usage = req.body.cpu_usage;
//      memory_usuage = req.body.memory_usuage;

// })
// Roll your own notification type:
 
// var statLog = slack.extend({
//   channel: '#internaldev',
//   icon_emoji: ':computer:',
//   username: 'Devi Prasadh'
// });
 
// statLog({
//   text: 'Current server statistics',
//   fields: {
//     'CPU usage': '76.51%',
//     'Memory usage': '2544mb'
//   }
// });
 
// Callbacks and a generic onError function are supported:
 
slack.alert('Hello', function (err) {
  if (err) {
    console.log('API error:', err);
  } else {
    console.log('Message received!');
  }
});
 
slack.onError = function (err) {
  console.log('API error:', err);
};