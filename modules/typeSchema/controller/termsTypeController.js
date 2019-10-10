module.exports = (app, termsTypeModel) => {

    app.post('/newterms/', (req, res) => {
        var terms = new termsTypeModel();
        terms.termsType = req.body.termsType;
        var questions = {
            fieldID: req.body.fieldID,
            displayName: req.body.displayName,
            inputType: req.body.inputType,
            options: req.body.options
        };
        // termsTypeModel.questions.push(questions);
        // terms.questions = req.body.questions;
        // terms.fieldID = req.body.fieldID
        // terms.displayName = req.body.displayName;
        // terms.inputType = req.body.inputType;
        // terms.options = req.body.options;
        terms.termsText = req.body.termsText;
        termsTypeModel.findOneAndUpdate({ $push: { questions: questions } }).then(data, err => {
            if (data === null) {
                console.log(err);
                res.status(400).json({
                    code: 'failure'
                })
            } else {
                res.status(200).json({
                    code: 'success',
                });
            }
        }).catch(err => {
            res.status(400).json({
                code: 'failure'
            })
        })
        terms.save().then((data) => {
            res.status(200).json({
                code: 'success',
                data: data
            });
        }).catch(err => {
            res.status(400).json({
                code: 'failure'
            })
        })
    });

    app.get('/termstype/:typeID/', (req, res) => {
        console.log(req.params);
        var typeID = req.params.typeID
        termsTypeModel.findOne({ termsType: termsType }).then((data, err) => {
            if (data != null) {
                res.send(data)
            } else {
                res.send('null')
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                code: 'failure'
            })
        })
    });
}