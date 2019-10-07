const express = require('express')
const app = express()
const initDB = require('./db')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var dbController = require('./controller/dbController')

const artistData = require('./models/artistDbModel')

dbController(app, artistData)

initDB(()=>{
    app.listen(4000, (err, res)=>{
        console.log('Connection Established');
    })
})