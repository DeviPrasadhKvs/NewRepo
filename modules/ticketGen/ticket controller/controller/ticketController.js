module.exports = (app, email, senddata, apiResponse, customerQueryModel, threadModel) => {

    app.post('/query', function(req, res) {
        customerData = new customerQueryModel();
        customerData.profileID = req.body.profileID;
        customerData.issueID = req.body.issueID;
        customerData.name = req.body.name;
        customerData.email = req.body.email;
        customerData.query = req.body.query;
        customerData.status = 'PENDING';
        customerData.save().then(data => {
            console.log(data);
            threadModel.findOneAndUpdate({ profileID: data.profileID }, { thread: [{ issueID: data.issueID, status: data.status }] })
                .then(d => {
                    console.log(d);
                    return res.status(200).send(apiResponse.sendReply(1, 'Successful', data))
                })
        }).catch(error => {
            return res.status(500).send(apiResponse.reportError(error))
        })
    })

    app.get('/customerQueries', function(req, res) {
        customerQueryModel.find().then(data => {
            return res.status(200).send(apiResponse.sendReply(1, 'Successful', data))
        }).catch(error => {
            return res.status(500).send(apiResponse.reportError(error))
        })
    })

    app.get('/customerQueries/:profileID', function(req, res) {
        console.log(req.params.profileID)
        customerQueryModel.find({ profileID: req.params.profileID }).then(data => {
            return res.status(200).send(apiResponse.sendReply(1, 'Successful', data))
        }).catch(error => {
            return res.status(500).send(apiResponse.reportError(error))
        })
    })

    app.get('/awaitQuery/:id', function(req, res) {
        customerQueryModel.findOneAndUpdate({ $and: [{ _id: req.params.id }, { 'status': "PENDING" }] }, { status: "In_progress" }).then(resdata => {
            console.log(resdata);
            return res.status(200).send(apiResponse.sendReply(1, 'Successful', data))
        }).catch(error => {
            return res.status(500).send(apiResponse.reportError(error))
        })
    })

    app.post('/resolutionQuery/:profileID', function(req, res) {
        customerQueryModel.findOneAndUpdate({ profileID: req.params.profileID }, { status: "Resolved & Closed" }).then(resdata => {
            console.log(resdata);
            return res.status(200).send(apiResponse.sendReply(1, 'Successful', resdata))
        }).catch(error => {
            return res.status(500).send(apiResponse.reportError(error))
        })
    })
}