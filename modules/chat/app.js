const express = require('express')
const app = express();
const initDB = require('./db')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var chatController = require('./chatController')
const chatS = require('./model/chatSchema');

chatController(app, chatS)

initDB(() => {
    app.listen(4000, (err, res) => {
        console.log('Connected');
    })
});