const mongoose = require('mongoose');

module.exports = (app, apiResponse, approvalDB) => {

    app.post('/new', function(req, res) {
        console.log(req.body);
        var approve = new approvalDB();
        approve.memberID = req.body.memberID;
        approve.memberImage = req.body.memberImage;
        approve.passport = req.body.passport;
        approve.drivingLicense = req.body.drivingLicense;
        approve.idCard = req.body.idCard;
        approve.residentPermitID = req.body.residentPermitID;
        approve.memberStatus = req.body.memberStatus;

        approve.save().then((result) => {
            return res.status(200).send(apiResponse.sendReply(1, 'Successful', data))
        }).catch((err) => {
            return res.status(500).send(apiResponse.reportError(error))
        });
    });

    app.get('/fetchData', (req, res) => {
        approvalDB.find().then((data, error) => {
            if (data != null) {
                return res.status(200).send(apiResponse.sendReply(1, 'Successful', data))
                console.log(data);
            } else {
                return res.status(500).send(apiResponse.reportError(error))
            }
        }).catch((err) => {
            console.log(err);
            return res.status(500).send(apiResponse.reportError(error))
        });
    });

    app.get('/fetchData/:memberID', (req, res) => {
        console.log(req.params);
        var memberID = req.params.memberID;
        approvalDB.findOne({ memberID: memberID }).then((result, error) => {
            if (result != null) {
                return res.status(200).send(apiResponse.sendReply(1, 'Successful', data))
            } else {
                return res.status(500).send(apiResponse.reportError(error))
            }
        }).catch((err) => {
            console.log(err);
            return res.status(500).send(apiResponse.reportError(error))
        });
    });

    app.get('/approve/:memberID', (req, res) => {
        console.log(req.params.memberID);
        var memberID = req.params.memberID;
        approvalDB.findOneAndUpdate({ memberID: memberID }, { memberStatus: true }).then((data, error) => {
            if (data === null) {
                return res.status(500).send(apiResponse.reportError(error))
            } else {
                return res.status(200).send(apiResponse.sendReply(1, 'Successful', data))
            };
        }).catch((err) => {
            return res.status(500).send(apiResponse.reportError(error))
        });
    });

    app.get('/reject/:memberID', (req, res) => {
        console.log(req.params.memberID);
        var memberID = req.params.memberID;
        approvalDB.findOneAndUpdate({ memberID: memberID }, { memberStatus: false }).then((data, err) => {
            if (data === null) {
                return res.status(500).send(apiResponse.reportError(error))
            } else {
                return res.status(200).send(apiResponse.sendReply(1, 'Successful', data))
            }
        }).catch((err) => {
            return res.status(500).send(apiResponse.reportError(error))
        });
    });
}