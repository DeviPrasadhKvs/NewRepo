module.exports = (app, pages) => {
    app.get('/pages', (req, res) => {
        res.send('Working')
    })
    app.get('/pagination', (req, res) => {
        console.log(req.body)
        pages.find({}).skip(0).limit(5).exec(function(error,data) {
            if (error) {
                console.log(err);
                res.status(400).json({
                    code: 'failure',
                    data:err
                })
            } else {
                console.log(data);
                res.status(200).json({
                    code: 'success',
                    data: data
                });
            }
        })
    })
    // app.get('/create',(req,res)=>{
    //     var p = new pages()
    //     p.username = req.query.name
    //     p.save().then((data,err)=>{
    //         res.send({
    //             data:data,
    //             err:err
    //         })
    //     })
    // })
}