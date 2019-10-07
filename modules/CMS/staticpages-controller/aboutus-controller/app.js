var express = require('express')
var app = express();

const initDB = require('./db')
const aboutus = require('./models/aboutus-schema')

const aboutusController = require('./aboutus-controller');

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get('/', function(req, res) {
    res.status(200).send('Server is up and running')
});

aboutusController(app,aboutus)

initDB(()=>{
    app.listen(4500, (err, res)=>{
        console.log('Connected to Database 4500');
    })
})