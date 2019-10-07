var Schema = new mongoose.Schema({
	_id    : String,
	data   : String
});

var termsConditions = mongoose.model('terms', Schema);
var privacyPolicy = mongoose.model('policy', Schema);
var aboutUs = mongoose.model('about', Schema);
 
app.get('/view', function(req, res){
    termsConditions.find({}, function(err, docs){
		if(err){ 
            res.json(err);
        }
        else{
            // res.render('web_page');
        }
	});
});
 
app.post('/edit', function(req, res){
	new edit({
		_id    : req.body.email,
		data   : req.body.data				
	}).save(function(err, docs){
        if(err){
            res.json(err);
        }
		else{
            res.redirect('/view');
        }
	});
});