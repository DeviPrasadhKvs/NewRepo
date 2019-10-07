let express = require('express')
let app = express();
const initDB = require('./db')
let pages = require('./models/pagination_schema');
let paginationController = require('./pagination-controller');

app.use(express.urlencoded({extended:true}))
app.use(express.json());


// initdb(db => {
//     let review = require('./pagination-controller');
    // pages(app, paginationSchema, apiResponse, db)
// });

app.get('/', (req, res) => {
    res.status(200).send('Server is up and running')
});

paginationController(app,pages)

initDB(()=>{
    app.listen(4000, (err, res)=>{
        console.log('Connected to Database');
    })
})