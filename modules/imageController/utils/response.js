let Boom = require('@hapi/boom');

let localisedStrings = {
    'DEFAULT_SUCCESS_MESSAGE': {
        en: 'Successful.',
        es: 'Spanish successful'
    },
    'DEFAULT_FAILURE_MESSAGE': {
        en: 'Failure.',
        es: 'Spanish failure.'
    }
}


class sendResponse {

    constructor() {

        //---sucess code
        this.SUCCESS = 200;
        //-----Server errors
        this.SERVER_ERROR = 500;
        this.GATEWAY_TIMEOUT = 504;
        // ----Client errors
        this.NOT_FOUND = 404;
        this.UNAUTHORIZED = 401;
        this.FORBIDDEN = 403;
        this.BAD_REQUEST = 400;
        this.REQUEST_TIMEOUT = 408
        this.ALREADY_EXIST = 409;
        this.PRECONDITION_FAILED = 412;

        // ----System Error Codes 
        this.PARAMETER_MISSING = 1100;
        this.FILE_NOT_UPLOADED = 1101;
        this.VALUE_NOT_UNIQUE = 1102;

        // ---- Unofficial codes
        this.METHOD_FAILURE = 420;

        // ----Internet Information Services
        this.TIME_OUT = 440;
        this.RETRY = 449;
        this.REDIRECT = 451;
    }


    static sendFailure(errObj, lang, statusCode, data) {
        data = '' || data;

        if (typeof errObj === typeof '') {
            var message = localiseStrings.getLocalisedTextFor(errObj, lang);
            message = message === undefined ? localisedStrings.DEFAULT_FAILURE_MESSAGE.lang : message;
            return new Boom(message, {
                statusCode: statusCode,
                data
            });
        } else {
            return Boom.boomify(errObj, {
                statusCode: statusCode,
                data
            })
        }
    }

    static sendSuccess(strKey, data, lang) {
        var message = localiseStrings.getLocalisedTextFor(strKey, lang);
        message = message === undefined ? localisedStrings.DEFAULT_SUCCESS_MESSAGE.lang : message;
        return {
            success: 200,
            message: message,
            data: data
        };
    }
}

class localiseStrings {
    static getLocalisedTextFor(key, lang) {
        try {
            var message = localisedStrings[key][lang];
            console.log(message)
            message = message === undefined ? localisedStrings['DEFAULT_FAILURE_MESSAGE']['en'] : message;
            return message;
        } catch (e) {
            message = message === undefined ? localisedStrings['INVALID_LANGUAGE']['en'] : message;
            return message;
        }
    }
}




module.exports.response = sendResponse;
module.exports.localise = localiseStrings;