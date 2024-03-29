//ngr
var serveStatic = require('serve-static');

const express = require('express')
const app = express();
let cors = require('cors')

// const initDB = require('./db')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

var chatController = require('./chatController')
chatController(app)

// initDB(() => {
app.listen(5000, (err, res) => {
    console.log('Connected');
})

app.use(serveStatic(__dirname))

app.get('/index', (req, res) => {
    res.status(200).send('Server is up and running');
    res.sendFile('index');
});
// });