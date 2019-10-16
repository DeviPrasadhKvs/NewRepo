module.exports = (app, termsTypeModel) => {

    app.post('/newterms/', (req, res) => {
        var terms = new termsTypeModel();
        var questions = {}
        terms.termsType = req.body.termsType;
        terms.fieldID = req.body.fieldID,
            terms.displayName = req.body.displayName,
            terms.inputType = req.body.inputType,
            terms.options = req.body.options
        terms.termsText = req.body.termsText;

        // termsTypeModel.questions.push(questions);
        // terms.questions = req.body.questions;
        // terms.fieldID = req.body.fieldID
        // terms.displayName = req.body.displayName;
        // terms.inputType = req.body.inputType;
        // terms.options = req.body.options;
        termsTypeModel.findOneAndUpdate({ $push: { questions: terms } }).then(data, err => {
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