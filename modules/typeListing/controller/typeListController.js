module.exports = (app, typeListModel, uniqid) => {

    app.post('/newlist/', (req, res) => {
        var typeList = new typeListModel();
        typeList.typeID = uniqid();
        typeList.value = req.body.value
        typeList.type = req.body.type;
        typeList.iconURL = req.body.iconURL
        typeList.imageURL = req.body.imageURL;
        typeList.save().then((data) => {
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

    app.get('/typelist/:typeID/', (req, res) => {
        console.log(req.params);
        var typeID = req.params.typeID
        typeListModel.findOne({ typeID: typeID }).then((data, err) => {
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