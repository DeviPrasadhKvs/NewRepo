const express = require('express')
const app = express()
const initDB = require('./db')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var fetchController = require('./controller/fetchController')

const fetchData = require('./models/fetchModel')

fetchController(app, fetchData)

initDB(()=>{
    app.listen(4000, (err, res)=>{
        console.log('Connection Established');
    })
})