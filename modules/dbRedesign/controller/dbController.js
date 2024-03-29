module.exports = (app, artistData) => {

    app.get('/profile', (req, res) => {
        artistData.findOne({ _id: req.query.id }).then((data, err) => {
            if (err) {
                console.log(err)
            } else {
                artistData.updateOne({ _id: data._id }).exec().then((data, err) => {
                    if (err) {
                        console.log("error" + err);
                    } else {
                        console.log("inside updateone " );
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
    });

    app.post('/updateProfile', (req, res) => {
        console.log(req.body)
        // iam = req.body.iam;
        // profileType = req.body.profileType;
        firstName = req.body.firstName;
        // middleName = req.body.middleName;
        // displayName = req.body.displayName;
        lastName = req.body.lastName;
        // gender = req.body.gender;
        // email = req.body.email;
        // contactNumber = req.body.contactNumber;
        website = req.body.website;
        facebook = req.body.facebook;
       // twitter = req.body.twitter;
        instagram = req.body.instagram;
        // city = req.body.city;
        // country = req.body.country;
        // address = req.body.address;
        // description = req.body.description;
        // estimatedTime = req.body.estimatedTime;
        // pricePerHour = req.body.pricePerHour;
        // tags = req.body.tags;
        // title = req.body.title;
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
    });

    app.delete('/deleteProfile', (req, res) => {
        artistData.deleteOne({
            _id: req.params.id
        }, (err, result) => {
            if (!err) {
                console.log(err);
            }
    });
    });
    
    app.post('/new', (req, res) => {
        console.log(req.body)
        id = req.body.profileID;
        status = req.body.status;
        var ad = new artistData()
        ad.iam = req.body.iam;
        ad.profileType = req.body.profileType;
        ad.firstName = req.body.firstName;
        ad.middleName = req.body.middleName;
        ad.displayName = req.body.displayName;
        ad.lastName = req.body.lastName;
        ad.gender = req.body.gender;
        ad.email = req.body.email;
        ad.contactNumber = req.body.contactNumber;
        ad.website = req.body.website;
        ad.facebook = req.body.facebook;
        ad.twitter = req.body.twitter;
        ad.instagram = req.body.instagram;
        ad.city = req.body.city;
        ad.country = req.body.country;
        ad.address = req.body.address;
        ad.description = req.body.description;
        ad.estimatedTime = req.body.estimatedTime;
        ad.pricePerHour = req.body.pricePerHour;
        ad.tags = req.body.tags;
        ad.title = req.body.title;
        ad.id = req.body.profileID;
        ad.save().then((data) => {
                console.log(data);
                res.status(200).json({
                    code: 'success'
                });
        }).catch(err => {
            res.status(400).json({
                code: 'failure'
            })
        })
    })
}