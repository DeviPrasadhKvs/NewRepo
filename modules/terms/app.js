const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + 'public'));
const mongoose = require('mongoose');
const regi = require('./artist.model');
var uniqid = require('uniqid');
const port = 5050;

app.listen(port);
app.use(express.json({extended : true}));
app.use(express.urlencoded({extended : true}));
const db = 'mongodb+srv://devi:qwerty12345@cluster0-i8xqe.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(db, {useNewUrlParser : true});

let mydb = mongoose.connection;
mydb.once('open', (data)=>{
    console.log('connected');
}) 

mydb.on('error',console.error.bind(console, 'Error with Mongo connection'));

app.get('/',function(req, res){
    // res.render('termsForm')
});

app.post('/artistterms', (req,res)=>{
    var register = new regi();
    register._id = uniqid();
    register.price = req.body.price;
    register.size = req.body.size;
    register.bookingFor = req.body.bookingFor;
    register.bookingPeriod = req.body.bookingPeriod;
    register.rushRequests = req.body.rushRequests;
    register.creativeFreedom = req.body.creativeFreedom;
    register.requestType = req.body.requestType;
    register.coverupRequests = req.body.coverupRequests;
    register.placementPhotos = req.body.placementPhotos;
    register.visualReferences = req.body.visualReferences;
    register.referenceOtherArt = req.body.referenceOtherArt;
    register.customDesign = req.body.customDesign;
    register.draftReviews = req.body.draftReviews;
    register.venueDetails = req.body.venueDetails;
    register.finalInvoiceVariation = req.body.finalInvoiceVariation;
    register.revisionsOfWork = req.body.revisionsOfWork;
    register.chargesForEdit = req.body.chargesForEdit;
    register.cancelationCharges72hr = req.body.cancelationCharges72hr;
    register.billing = req.body.billing;
    register.cancellationCharges = req.body.cancellationCharges;
    register.freeText = req.body.freeText;
    
    register.save().then((data)=>{
        console.log(data);
        console.log(req.body);
        
        res.send({
            data:data,
            status:'success'
        })
    }).catch((err)=>{
        console.log(err);  
        res.send({error:err})
    })
    // res.render('')
})

app.get('/artistterms/:id', (req, res)=> {
    var id = req.params.id;
    var query = {_id:id}
    mydb.collection("artists").find(query).toArray(function(err, result) {
        if (err) throw err;
        res.send({result});
    });
});