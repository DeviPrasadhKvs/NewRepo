module.exports = (app, email, utils, customerQueries, threadModel) => {

    app.post('/query', function(req, res) {
        customerData = new customerQueries();
        customerData.profileId = req.body.profileId;
        customerData.issueID = req.body.issueID;
        customerData.name = req.body.name;
        customerData.email = req.body.email;
        customerData.query = req.body.query;
        customerData.status = 'PENDING';
        customerData.save().then(data => {
            console.log(data);
            threadModel.findOneAndUpdate({ profileId: data.profileId }, { thread: [{ issueID: data.issueID, status: data.status }] })
                .then(d => {
                    console.log(d);
                    res.send({
                        resdata: utils.sendReply(200, "successful", data)
                    });
                })
        }).catch(error => {
            res.send({
                err: utils.reportError(error)
            });

        })
    })

    app.get('/customerQueries', function(req, res) {
        customerQueries.findOneAndUpdate().then(data => {
            res.send({
                resdata: utils.sendReply(200, "successful", data)
            });

        }).catch(error => {
            res.send({
                err: utils.reportError(error)
            });
        })
    })

    app.get('/customerQueries/:profileId', function(req, res) {
        console.log(req.params.profileId)
        customerQueries.findOne({ profileId: req.params.profileId }).then(data => {
            console.log("data : ", data)
            res.send({
                resdata: utils.sendReply(200, "successful", data)
            });
        }).catch(error => {
            res.send({
                err: utils.reportError(error)
            });
        })
    })

    app.post('/awaitQuery/:profileId', function(req, res) {
        email.senddata();
        customerQueries.findOneAndUpdate({ $and: [{ profileId: req.params.profileId }, { 'status': "PENDING" }] }, { status: "In_progress" }).then(nodemailerdata => {
            res.send({
                resdata: utils.sendReply(200, "successful", nodemailerdata)
            });
        }).catch(error => {
            res.send({
                err: utils.reportError(error)
            });
        })
    })

    app.post('/resolutionQuery/:profileId', function(req, res) {
        email.senddata();
        customerQueries.findOneAndUpdate({ profileId: req.params.profileId }, { status: "Resolved & Closed" }).then(nodemailerdata => {
            res.send({
                resdata: utils.sendReply(200, "successful", nodemailerdata)
            });
        }).catch(error => {
            res.send({
                err: utils.reportError(error)
            });
        })
    })
}