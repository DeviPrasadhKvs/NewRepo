const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var botBuilder = require('./code')
botBuilder(app)

app.get("/", function(req, res){
    res.send("It works!");
});

app.listen(4000, (err, res)=>{
    console.log('Connection Established');
})