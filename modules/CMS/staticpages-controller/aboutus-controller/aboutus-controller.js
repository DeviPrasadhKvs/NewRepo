module.exports = (app,aboutus) =>{
    app.get('/', (req, res) => {
        res.send('Working')
    })
    app.get('/aboutus', function(req, res){
        aboutus.find({_id:req.query.id}, function(err, docs){
            if(err){ 
                res.json(err);
            }
            else{
                res.send(docs)
            }
        });
    });
    app.post('/edit', function(req, res){
        var edit = {
            _id:req.body.email,
            data:req.body.data
        }		
        aboutus.findOneAndUpdate({_id:edit._id}, edit, {upsert:true}, function(err, docs){
            if(err){
                res.json(err);
            }
            else{
                res.send("data updated")
            }
        });
    });
}