const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const initDB = require('./db')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

var termsTypeController = require('./controller/termsTypeController')
var termsTypeModel = require('./model/termsTypeModel')

termsTypeController(app, termsTypeModel)

initDB(() => {
    app.listen(5000, (err, res) => {
        console.log('Connected');
    })
});