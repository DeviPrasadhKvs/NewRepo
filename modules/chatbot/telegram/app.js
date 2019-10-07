const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var tg = require('./tg');
tg(app);

app.listen(4000, (err, res)=>{
    console.log('Connection Established');
})