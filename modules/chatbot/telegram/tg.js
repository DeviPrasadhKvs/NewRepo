var telegram = require('telegram-bot-api');

module.exports = (_app) => {

var api = new telegram({
        token: '905196113:AAHwEX6cck2sodC2b262sresV1kEnrSuEIU'
});

api.getMe()
.then(function(data)
{
    console.log(data);
})
.catch(function(err)
{
	console.log(err);
});
}