const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var chat = require('./chat').default.default;

app.listen(4000, (err, res) => {
    console.log('Connection Established');
})