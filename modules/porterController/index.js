let express = require('express');
let app = express();
let appConstants = require('./config').appConstants;

//--------------------------------------------------------------------
// Body parser middleware
app.use(express.json({
    limit: appConstants.bodyLimit
}));
app.use(express.urlencoded({
    extended: true
}));
// Define Utils
let apiResponse = require('./utils/response');

app.get('/', (req, res) => {
    res.status(200).send('Server is up and running')
});
// Define models
let porterSechma = require('./models/product');
// Define App Routes
let porter = require('./porter-controller/porter-controller');
porter(app, porterSechma, apiResponse)

// Start application
app.all('*', (req, res) => {
    let statusCode = new apiResponse.response().NOT_FOUND;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, ''));
    res.status(404).send('NOT FOUND')
});

let PORT = 3010 || process.env.PORT;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console 
    console.log(`Connection established on Port: ${PORT}`);
});