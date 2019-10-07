let express = require('express')
let app = express();
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser= require('body-parser');

const initDB = require('./db')
let controller = require('./controller');

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
app.set('view engine', 'ejs');
app.get(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
    res.status(200).send('Server is up and running')
});

initDB(()=>{
    app.listen(4000, (err, res)=>{
        console.log('Connected to Database' + app.get('port'));
    })
})