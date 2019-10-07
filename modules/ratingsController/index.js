let express = require('express');
let app = express();
let appConstants = require('./config').appConstants;
// Body parser middleware
app.use(express.json({
    limit: appConstants.bodyLimit
}));
app.use(express.urlencoded({
    extended: true
}));

let initdb = require('./db');

// Define Utils
let apiResponse = require('./utils/response');

app.get('/', (req, res) => {
    res.status(200).send('Server is up and running')
});
// Define models
let ArtistReviewSchema = require('./models/review-schema');
// Define App Routes
initdb(db => {
    let review = require('./review-controller/review-controller');
    review(app, ArtistReviewSchema, apiResponse, db)
});
// Start application
app.all('*', (req, res) => {
    let statusCode = new apiResponse.response().NOT_FOUND;
    return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, ''));
});

let PORT = 3011 || process.env.PORT;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console 
    console.log(`Connection established on Port: ${PORT}`);
});