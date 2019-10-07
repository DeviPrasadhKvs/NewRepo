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


    return app;
}