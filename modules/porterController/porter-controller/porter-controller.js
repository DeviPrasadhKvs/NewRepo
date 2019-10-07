const porterValidations = require('./porter-validator-controller')
module.exports = function product(app, porterSechma, apiResponse) {

    const {
        validationResult
    } = require('express-validator');
    const mongoose = require('mongoose');

    const db = 'mongodb+srv://devi:qwerty12345@cluster0-i8xqe.gcp.mongodb.net/test?retryWrites=true&w=majority';

    mongoose.connect(db, {
        useNewUrlParser: true
    });

    let mydb = mongoose.connection;
    mydb.once('open', (data) => {
        console.log('connected');
    })

    mydb.on('error', console.error.bind(console, 'Error with Mongo connection'));

    app.post('/:lang/porter', porterValidations.insertProduct(), (req, res) => {
        // ===== check validator ====
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
        }
        var product = new porterSechma();
        product._id = uniqid();
        product.product_created_on = Date.now();
        product.product_name = req.body.product_name;
        product.product_image = req.body.product_image;
        product.product_description = req.body.product_description;
        product.product_authorized = req.body.product_authorized;
        product.product_status = req.body.product_status;

        porterSechma.save().then((data) => {
            return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', data, req.params.lang));
        }).catch((err) => {
            console.log(err);
            res.send({
                error: err
            })
        })
    })

    app.get('/:lang/porter/:product_id', porterValidations.getProduct(), (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let statusCode = new apiResponse.response().BAD_REQUEST;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
        }
        var id = req.params.id;
        var query = {
            _id: id
        }
        mydb.collection("products").find(query).toArray(function (err, result) {
            if (err) {
                let statusCode = new apiResponse.response().SERVER_ERROR;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, err));
            }
            else{
                return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', result, req.params.lang));
            }
        });
    });

    app.post('/:lang/porter', (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors));
        }
        if (req.body._id == '')
            insertRecord(req, res);
        else
            updateRecord(req, res);
    });

    function insertRecord(req, res) {
        product.updateOne({
            _id: req.body.pr_id
        }, req.body, {
            new: true
        }, (err, doc) => {
            if (!err) {
                res.redirect('porter')
            }
            else {
                console.log('Error while updating the data' + err);
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors));
            }
        });
    }

    function updateRecord(req, res) {
        product.findOneAndUpdate({
            _id: req.body._id
        }, req.body, {
            new: true
        }, (err, doc) => {
            if (!err) {
                res.redirect('porter');
            } else {
                console.log('Error while updating the data' + err);
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors));
            }
        })
    };


    app.delete('/:lang/porter/:id', porterValidations.deleteProduct(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        product.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                res.redirect('porter/list');
            } else {
                console.log('Error while deleting the data: ' + err);
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors));
            }
        });
    });
    return app;
}