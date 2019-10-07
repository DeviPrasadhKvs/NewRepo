const mongoose = require('mongoose')

module.exports = function initDB(callback){
    //mongoose.connect(process.env.MONGO_DB_CONNECT_STRING, { useNewUrlParser: true })
    let db = mongoose.connect('mongodb+srv://devi:qwerty12345@cluster0-i8xqe.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
    callback(db);
    let mydb = mongoose.connection.once('open', ()=>{
        console.log('Connected to MongoDB');
    }).on('error', (err)=>{
        console.log('err', console.error.bind(console, 'Error with Mongo connection'));
    })
}