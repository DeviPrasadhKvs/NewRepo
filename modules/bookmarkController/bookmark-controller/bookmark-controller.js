const bookmarkValidations = require('./bookmark-validator-controller')
module.exports = function product(app, bookmarkSchema, apiResponse, db) {

    const {
        validationResult
    } = require('express-validator');

    app.post('/:lang/bookmark', bookmarkValidations.insertBookmark(), (req, res) => {
        try {

            // ===== check validator ====
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().SERVER_ERROR;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE',req.params.lang, statusCode, errors.array()));
            }

            bookmarkSchema.findOne({
                profile_id: req.body.profile_id,
                bookmark_type_id: req.body.bookmark_type_id,
                bookmark_type: req.body.bookmark_type
            }).then((data) => {
                if (data) {
                    let statusCode = new apiResponse.response().ALREADY_EXIST;
                    return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', statusCode, e));
                } else {
                    let book = new bookmarkSchema();
                    console.log(book);
                    book.bookmark_type_id= req.body.bookmark_type_id
                    book.bookmark_type= req.body.bookmark_type
                    book.profile_id= req.body.profile_id
                    console.log(book);
                    
                    book.save().then((insertData) => {
                        return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', insertData, req.params.lang));
                    })
                }
            })
        } catch (e) {
            console.log(e);
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE',req.params.lang, statusCode, e));
        }
    })

    app.delete('/:lang/bookmark/:id', bookmarkValidations.deleteBookmark(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE',req.params.lang, statusCode, errors));
        }
        bookmarkSchema.deleteOne({
            _id: req.params.id
        }, (err, result) => {
            if (!err) {
                return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', result, req.params.lang));
            } else {
                let statusCode = new apiResponse.response().SERVER_ERROR;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE',req.params.lang, statusCode, err));
            }
        });
    });

    app.get('/:lang/bookmark/:id', bookmarkValidations.getBookmark(), async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().BAD_REQUEST;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE',req.params.lang, statusCode, errors.array()));
            }
            bookmarkSchema.findOne({
                _id: req.params.id
            }).then(result => {
                return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', result, req.params.lang));
            })

        } catch (e) {
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
        }
    });

    app.get('/:lang/bookmark', bookmarkValidations.getMultiBookmark(), async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().BAD_REQUEST;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
            }

            bookmarkSchema.find({
                bookmark_type_id :req.query.bookmark_type_id, 
                bookmark_type :req.query.bookmark_type
            })
            .then(result => {
                return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', result, req.params.lang));
            })

        } catch (e) {console.log(e);
        
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, e));
        }
        
    });

    app.get('/:lang/bookmark/user/:profile_id', bookmarkValidations.getUserBookmark(), async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().BAD_REQUEST;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
            }

            bookmarkSchema.find({
                profile_id :req.params.profile_id
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