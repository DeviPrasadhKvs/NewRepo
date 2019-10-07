const mongoose = require('mongoose')
module.exports = (app, fetchData) => {

    app.get('/retrieve', (req, res) => {
        // console.log(req.query);
        var id = req.query.id
        fetchData.findOne({ _id:id }).then((data, err) => {
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

    app.post('/update', (req, res) => {
        console.log(req.body)
        id = req.body.id;
        name = req.body.name;
        position = req.body.position;
        url = req.body.url;
        text = req.body.text;
        styles = req.body.styles;

        fetchData.updateOne({ _id: id}, {name, position, url, text, styles}).
        exec().then((data, err) => {
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
            console.log(err);
            res.status(400).json({
                code: 'failure'
            })
        })
    });

    app.delete('/delete', (req, res) => {
        fetchData.deleteOne({
            _id: req.query.id
        }, (err, result) => {
            if (!err) {
                console.log(result);
            }
            
        });
    });

    app.post('/new', (req, res) => {
        id = req.body.id;
        console.log(req.body);
        var fetch = new fetchData();
        fetch.id = req.body.id;
        fetch.name = req.body.name;
        fetch.position = req.body.position;
        fetch.url = req.body.url;
        fetch.text = req.body.text;
        fetch.styles = req.body.styles; 
        fetch.save().then((data) => {
            res.status(200).json({
                code: 'success',
                data: data
            });
        }).catch(err => {
            res.status(400).json({
                code: 'failure',
                error: err
            })
        })
    })
}