import botBuilder, { fbTemplate as _fbTemplate } from 'claudia-bot-builder';
const fbTemplate = _fbTemplate;

export default botBuilder(message => {
    if (message.type === 'facebook') {
        const newMessage = new fbTemplate.Text('What\'s your favorite House in Game Of Thrones');

        return newMessage
            .addQuickReply('Stark', 'STARK')
            .addQuickReply('Lannister', 'LANNISTER')
            .addQuickReply('Targaryen', 'TARGARYEN')
            .addQuickReply('None of the above', 'OTHER')
            .get();
    }
});


// const botBuilder = require('claudia-bot-builder');
// const fbTemplate = botBuilder.fbTemplate;

// module.exports = botBuilder(message => {
//     if (message.type === 'facebook') {
//         return new fbTemplate.Button('How are you?')
//             .addButton('Awesome', 'AWESOME')
//             .addButton('Great', 'GREAT')
//             .addButton('🎵🎵🎵', 'https://youtu.be/m5TwT69i1lU')
//             .get();
//     }
// });