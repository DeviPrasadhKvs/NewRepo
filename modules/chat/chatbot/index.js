let express = require('express')
let app = express();
let cors = require('cors')
let flow = require('./flow.json')
let messageLinker = require('./messageLinker.json')
    // const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.raw({ type: '*/*' }));
app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: true }))

// initdb(db => {
//     let review = require('./payment-controller/payment-controller');
// payments(app, paymentSchema, apiResponse, db)
// });

app.get('/', (req, res) => {
    res.status(200).send('Server is up and running')
});

app.get('/chat/:data', (req, res) => {
    console.log(req.params);

    var d = req.params.data
    if (d.includes('*')) {
        var data = d.split('*')
        var s = flow[data[0]].replace('{{data}}', data[1])
        res.send(s)
            // res.send()
    } else {
        if (d === 'init') {
            var s = []
            flow['AO0'].forEach(element => {
                s.push(messageLinker[element])
            });
            res.send(s)
        } else {
            var s = []
            flow[d].forEach(element => {
                s.push(messageLinker[element])
            });
            res.send(s)
        }
    }
})
app.listen(4000, (err, res) => {
    console.log('connected and running on 4000');
})