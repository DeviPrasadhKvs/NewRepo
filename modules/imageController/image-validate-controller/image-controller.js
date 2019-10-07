const imageValidations = require('./image-validator-controller')
module.exports = function product(app, ImageValidateSchema, apiResponse, db) {

    const {
        validationResult
    } = require('express-validator');

    app.post('/:lang/image-validate', imageValidations.validateImage(), async (req, res) => {
        try {

            // ===== check validator ====
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().SERVER_ERROR;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
            }
            let imageRes = await ImageValidateSchema.findOne({
                image_hash: req.body.image_hash
            })
            if (imageRes) {
                let statusCode = new apiResponse.response().ALREADY_EXIST;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, imageRes));
            }
            let imageValid = new ImageValidateSchema();
            imageValid.image_name = req.body.image_name;
            imageValid.image_hash = req.body.image_hash;
            imageValid.image_status = 'NOT-REVIEWED';

            imageValid.save().then((insertData) => {
                return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', insertData, req.params.lang));
            })

        } catch (e) {
            console.log(e);
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, e));
        }
    })

    app.delete('/:lang/image-validate/:image_id', imageValidations.deleteImage(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors));
        }
        // --------delete image
    });

    app.put('/:lang/image-validate/:image_id', imageValidations.updateImage(), async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().BAD_REQUEST;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
            }
            let result = await ImageValidateSchema.findOne({
                _id: req.params.image_id
            })
            console.log(result);

            if (result) {
                result.image_status = req.body.image_status || result.image_status;
                console.log(req.body.image_status, 'req.body.status');
                let updatedRes = await result.save()

                return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', updatedRes, req.params.lang));

            } else {
                let statusCode = new apiResponse.response().NOT_FOUND;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, ''));
            }
        } catch (e) {
            console.log(e)
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, e));
        }

    });

    app.get('/:lang/image-validate/:image_id', imageValidations.getImage(), async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().BAD_REQUEST;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
            }
            ImageValidateSchema.findOne({
                image_id: req.params.image_id
            }).then(result => {
                return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', result, req.params.lang));
            })

        } catch (e) {
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
        }

    });

    app.get('/:lang/image-validate/image_hash/:image_hash', imageValidations.getImage(), async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().BAD_REQUEST;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
            }
            ImageValidateSchema.findOne({
                image_hash: req.params.image_hash
            }).then(result => {
                return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', result, req.params.lang));
            })

        } catch (e) {
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
        }

    });

    app.get('/:lang/image-validate', imageValidations.getImageByStatus(), async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().BAD_REQUEST;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
            }


            ImageValidateSchema.find({
                    image_status: req.query.image_status
                })
                .then(result => {
                    return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', result, req.params.lang));
                })

        } catch (e) {
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
        }

    });

    return app;
}