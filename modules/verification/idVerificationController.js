const mongoose = require('mongoose');

module.exports = (app) => {

    app.get('/getUnverifiedProfiles', (req, res) => {
        profileDataModel.find({ 'identification.imageStatus': "PENDING" }, { profileID: 1 }).then(data => {
            return res.status(200).send(apiResponse.sendReply(1, 'profiles need to be verifed fetched ', data))
        }).catch(e => {
            console.log(e)
            return res.status(500).send(apiResponse.sendReply(0, 'error in fetching profiles need to be verified', e))
        })
    })​;

    app.get('/getIdentificationDetails/:profileID', (req, res) => {
        profileDataModel.findOne({ profileID: req.params.profileID }, { identification: 1, profileID: 1 }).then(data => {
            return res.status(200).send(apiResponse.sendReply(1, 'profile need to be verifed fetched ', data))
        }).catch(e => {
            console.log(e)
            return res.status(500).send(apiResponse.sendReply(0, 'error in fetching profile need to be verified', e))
        })
    });

    app.get('/approveIdentification/:profileID', (req, res) => {
        profileDataModel.findOneAndUpdate({ profileID: req.params.profileID }, { 'identification.imageStatus': "APPROVED", 'identification.verification': true }).then((data) => {
            //console.log('profile approved ' + data.profileID)
            console.log(data)
            return res.status(200).send(apiResponse.sendReply(1, 'profile approved ' + data.profileID))
        }).catch(e => {
            console.log(e)
            return res.status(500).send(apiResponse.sendReply(0, 'error in approving profile', e))
        })
    })​;

    app.post('/rejectIdentification/:profileID', (req, res) => {
        profileDataModel.findOneAndUpdate({ $and: [{ profileID: req.params.profileID }, { 'identification.imageStatus': "PENDING" }] }, { 'identification.imageStatus': "REJECTED", 'identification.verification': false, 'identification.reason': req.body.reason }).then(data => {
            if (data) {
                return res.status(200).send(apiResponse.sendReply(1, 'profile rejected for reason: ' + req.body.reason, data))
            } else {
                return res.status(500).send(apiResponse.sendReply(0, 'Invalid Request for this profile'))
            }​
        }).catch(e => {
            console.log(e)
            return res.status(500).send(apiResponse.sendReply(0, 'error in rejecting profile', e))
        })
    });
}