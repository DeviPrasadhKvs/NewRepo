const express = require('express')
const app = express()
const initDB = require('./mongoConfig/connection')
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
const axios = require('axios')

var cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));


const transport = axios.create({
    withCredentials: true
  })


var loginController = require('./authControllers/loginController')
var dataUploadController = require('./dataControllers/dataUploadController')
var registerController = require('./authControllers/registerController')
var mapController = require('./mapController/mapController')
var calendarController = require('./calendarController/calendarController')
var profileController = require('./profileController/profileController')


const User = require('./models/userDataModel')
const refreshTokenModel = require('./models/refreshTokenModel')
const artistData = require('./models/artistDataModel')
const tattooData = require('./models/tattooModel')



loginController(app, User, jwt, refreshTokenModel, transport)
dataUploadController(app, jwt, artistData, User, tattooData, transport)
registerController(app, User)
mapController(app, artistData)
calendarController(app, artistData)
profileController(app, artistData)

initDB(()=>{
    app.listen(4000, (err, res)=>{
        console.log('server started');
    })
})
