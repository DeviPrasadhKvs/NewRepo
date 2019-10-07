const fs = require('fs')
var path = require("path");
module.exports = (app, artistData) => {

    app.get('/profile', (req, res) => {
        artistData.findOne({ _id: req.query.id }).then((data, err) => {
            if (err) {
                console.log(err)
            } else {
                var directoryPath = "public/uploads/" + req.query.id + "/"
                var filenames = fs.readdirSync(directoryPath)
                data._doc.images = filenames
                data._doc.imageLocation = "3bac1b7b.ngrok.io/uploads/" + req.query.id + "/";
                //console.log(data.views)
                var views = parseInt(data.views)
                views = views + 1;
                // console.log(views);
                // console.log(data._id);
                artistData.updateOne({ _id: data._id }, { views: views }).exec().then((data, err) => {
                    if (err) {
                        console.log("error" + err);
                    } else {
                        console.log("inside updateone " + views);
                    }
                })
                res.send(data)
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                code: 'failure'
            })
        })
    })

    app.post('/updateProfile', (req, res) => {
        console.log(req.body)
        firstName = req.body.firstName;
        lastName = req.body.lastName;
        website = req.body.website;
        facebook = req.body.facebook;
        instagram = req.body.instagram;
        id = req.body.profileID;
        artistData.updateOne({ _id: id }, { firstName, lastName, website, facebook, instagram }).
        exec().then((data, err) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    code: 'failure'
                })
            } else {
                console.log(data);
                res.status(200).json({
                    code: 'success'
                });
            }
        }).catch(err => {
            res.status(400).json({
                code: 'failure'
            })
        })
    })
    app.get('/search', (req, res) => {
        var name = req.query.name;
        artistData.find({ firstName: { $regex: name, $options: 'i' } }).then((data, err) => {
            if (err) {
                res.status(400).json({
                    code: 'failure'
                })

            } else {
                res.send(data)
            }
        })
    })

    app.get('/profiles', (req, res) => {
        artistData.find({}).then((data) => {
            data.forEach(dataitem => {
                id = dataitem._id;
                var directoryPath = "public/uploads/" + id + "/"
                var filenames = fs.readdirSync(directoryPath)
                id = dataitem._id
                dataitem._doc.images = filenames
                dataitem._doc.imageLocation = "3bac1b7b.ngrok.io/uploads/" + id + "/";
            })
            res.send(data)
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                code: 'failure'
            })
        })
    })

    app.post('/editJury', (req, res) => {
        console.log(req.body)
        id = req.body.profileID;
        status = req.body.status;
        artistData.updateOne({ _id: id }, { isJuryMember: status }).
        exec().then((data, err) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    code: 'failure'
                })
            } else {
                console.log(data);
                res.status(200).json({
                    code: 'success'
                });
            }
        }).catch(err => {
            res.status(400).json({
                code: 'failure'
            })
        })
    })
}