const express = require('express')
const app = express();
const initDB = require('./db')
var uniqid = require('uniqid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var typeListController = require('./controller/typeListController')
var typeListModel = require('./model/typeListingModel')

typeListController(app, typeListModel, uniqid)

initDB(() => {
    app.listen(8000, (err, res) => {
        console.log('Connected');
    })
});