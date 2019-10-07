var serveStatic = require('serve-static');
const express = require('express')
const app = express();
let cors = require('cors')
const initDB = require('./db')

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var checkController = require('./checkController')
    // var idVerificationController = require('./idVerificationController')
var checkDb = require('./models/verificationModel')

checkController(app, checkDb);
// idVerificationController(app);

app.get('/', (req, res) => {
    res.send('Server Connected')
})

initDB(() => {
    app.listen(4050, (err, res) => {
        console.log('Connected');
    })

    app.use(serveStatic(__dirname))

    app.get('/index', (req, res) => {
        // res.status(200).send('Server is up and running');
        // res.sendFile('index1');
        res.sendFile(__dirname + '/index1.html');
    });
});