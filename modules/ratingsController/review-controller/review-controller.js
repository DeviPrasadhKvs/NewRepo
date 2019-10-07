const reviewValidations = require('./review-validator-controller')
module.exports = function product(app, ArtistReviewSchema, apiResponse, db) {

    
    const {
        validationResult
    } = require('express-validator');

    app.post('/:lang/review', reviewValidations.insertReview(), (req, res) => {
        try {

            // ===== check validator ====
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().SERVER_ERROR;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
            }

            ArtistReviewSchema.findOne({
                profile_id: req.body.profile_id
            }).then((data) => {
                if (data) {
                    let review_star = parseInt(req.body.review_star)
                    let averageRating = (data.average_rating + review_star) / (data.reviews.length + 1);
                    ArtistReviewSchema.update({
                        profile_id: req.body.profile_id
                    }, {
                        average_rating: averageRating,
                        $push: {
                            reviews: {
                                review_created_on: Date.now(),
                                reviewer_id: req.body.reviewer_id,
                                review_comment: req.body.review_comment,
                                review_star: req.body.review_star
                            }
                        }
                    }).then(updatedData => {
                        return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', updatedData, req.params.lang));

                    })
                } else {
                    let review = new ArtistReviewSchema();
                    review.profile_id = req.body.profile_id;
                    review.average_rating = 5;
                    review.reviews = {
                        review_created_on: Date.now(),
                        reviewer_id: req.body.reviewer_id,
                        review_comment: req.body.review_comment,
                        review_star: req.body.review_star
                    }
                    review.save().then((insertData) => {
                        return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', insertData, req.params.lang));
                    })

                }
            })

        } catch (e) {
            console.log(e);
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, e));
        }
    })

    app.delete('/:lang/review/:id', reviewValidations.deleteReview(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors));
        }
        ArtistReviewSchema.deleteOne({
            _id: req.params.id
        }, (err, result) => {
            if (!err) {
                return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', result, req.params.lang));
            } else {
                let statusCode = new apiResponse.response().SERVER_ERROR;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, err));
            }
        });
    });

    app.get('/:lang/review/:profile_id', reviewValidations.getReview(), async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().BAD_REQUEST;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
            }
            ArtistReviewSchema.findOne({
                profile_id: req.params.profile_id
            }).then(result => {
                return res.json(apiResponse.response.sendSuccess('DEFAULT_SUCCESS_MESSAGE', result, req.params.lang));
            })

        } catch (e) {
            let statusCode = new apiResponse.response().SERVER_ERROR;
            return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
        }

    });

    app.get('/:lang/review', reviewValidations.getMultiReview(), async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let statusCode = new apiResponse.response().BAD_REQUEST;
                return res.status(statusCode).json(apiResponse.response.sendFailure('DEFAULT_FAILURE_MESSAGE', req.params.lang, statusCode, errors.array()));
            }

            var profileIdArray = req.query.profile_id.split(",");
            ArtistReviewSchema.find({profile_id :{ $in :profileIdArray}})
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


