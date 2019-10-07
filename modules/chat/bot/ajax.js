module.exports = (app, page) => {​
    app.get('/pages', (req, res) => {
        res.send('Working')
    })​
    app.get('/pagination', (req, res) => {
        console.log(req.body)
        page.find({}, { skip: 0, limit: 30 }).
        exec().then((data, err) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    code: 'failure'
                })
            } else {
                console.log(data);
                res.status(200).json({
                    code: 'success',
                    data: data
                });
            }
        }).catch(err => {
            res.status(400).json({
                code: 'failure'
            })
        })
    })
}




$.ajax({
            url: url,
            data: updateReq,
            type: "GET",
            success: function(dd) {
                var table = document.getElementByID('')
                dd.forEach(k => {
                            var element = document.createElement('tr')
                            element.innerHTML = '<td>' + k.name + '</td>
                        }
                    },
                    error: function(data) {
                        log(data)
                    }
            });