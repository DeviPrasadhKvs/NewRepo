let express = require('express')
let app = express();
const initDB = require('./db')
let payments = require('./models/payments-schema');
let paymentsController = require('./payment-controller/payment-controller');
let pagination = require('../CMS/pagination-controller');

app.use(express.urlencoded({extended:true}))
app.use(express.json());


// initdb(db => {
//     let review = require('./payment-controller/payment-controller');
    // payments(app, paymentSchema, apiResponse, db)
// });

app.get('/', (req, res) => {
    res.status(200).send('Server is up and running')
});

paymentsController(app, payments)


initDB(()=>{
    app.listen(4000, (err, res)=>{
        console.log('Connected to Database');
    })
})