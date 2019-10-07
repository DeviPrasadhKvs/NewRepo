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
    res.status(200).send('Server is running')
});
// Define models
let bookmarkSchema = require('./models/bookmark-schema');
// Define App Routes
initdb(db => {
    let bookmark = require('./bookmark-controller/bookmark-controller');
    bookmark(app, bookmarkSchema, apiResponse, db)
});
// Start application
app.all('*', (req, res) => {
    let statusCode = new apiResponse.response().NOT_FOUND;
    return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, ''));
});

let PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console 
    console.log(`Connection established on Port: ${PORT}`);
});