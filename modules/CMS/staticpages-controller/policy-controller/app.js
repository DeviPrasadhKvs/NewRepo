var express = require('express')
var app = express();

const initDB = require('./db')
const privacyPolicy = require('./models/privacyPolicy-schema')

const privacyPolicyController = require('./policy-controller');

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get('/', function(req, res) {
    res.status(200).send('Server is up and running')
});

privacyPolicyController(app,privacyPolicy)

initDB(()=>{
    app.listen(4500, (err, res)=>{
        console.log('Connected to Database 4500');
    })
})