var serveStatic = require('serve-static');
const express = require('express')
const app = express();
let cors = require('cors')
const initDB = require('./db')
const apiResponse = require('./utils/response')

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var approvalController = require('./controller/approvalController')
var approvalDB = require('./models/approvalModel')

approvalController(app, apiResponse, approvalDB);

app.get('/', (req, res) => {
    res.send('Server Connected')
})

initDB(() => {
    app.listen(4000, (err, res) => {
        console.log('Connected');
    })

    // app.use(serveStatic(__dirname))

    // app.get('/index', (req, res) => {
    //     res.sendFile(__dirname + '/index.html');
    // });
});