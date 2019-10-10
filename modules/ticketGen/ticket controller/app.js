const express = require('express')
const app = express()
const initDB = require('./db')
const axios = require('axios')
const apiResponse = require('./utils/response')
var cors = require('cors')
var email = require('./nodemailerfile')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var ticketController = require('./controller/ticketController');
var customerQueryModel = require('./models/customerModel');
var threadModel = require('./models/threadModel');

ticketController(app, apiResponse, customerQueryModel, threadModel);

initDB(() => {
    app.listen(4000, () => {
        console.log('Server established on port: 4000');
    })
})