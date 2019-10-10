let mongoose = require('mongoose')
module.exports = (callback => {
    let db = mongoose.connect('mongodb+srv://TOF:Seaharrier@tof-4ouky.mongodb.net/SEEDBANK?retryWrites=true&w=majority', { useNewUrlParser: true });
    callback(db);
    let mydb = mongoose.connection;
    mydb.once('open', (data) => {
        console.log('Database Connection Established');
    })
    mydb.on('error', console.error.bind(console, 'Error with Mongo connection'));
});