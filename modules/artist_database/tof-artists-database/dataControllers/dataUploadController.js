var multer = require('multer')
const fs = require('fs')
const axios = require('axios')
var crypto = require('crypto')
var path = require("path");
var uuid = require('uuid/v4');
var mysql = require('mysql')


module.exports = (app, jwt, artistData, User, tattooData, transport)=>{

    var user_email
    var user_name
    var user_role
    var isWorker =  (req, res, next)=>{

        user_token = req.cookies.token

        if(!user_token){
            res.status(401).send('redirect to login')
        }else{
            var pbkey = fs.readFileSync('./keys/publicKey.pem', {encoding:'utf8'})
            const payload = jwt.verify(user_token, pbkey, {ignoreExpiration: true} )
           user_email = payload.email;
           user_role = payload.role;
            if(payload.role != 'worker'){
                res.locals.isWorker = false
                next()
            }else if(payload.role == 'worker'){
                res.locals.isWorker = true
                next()
            }
            }
    }

    var isAdmin =  (req, res, next)=>{

        user_token = req.cookies.token

        if(!user_token){
            res.status(401).send('redirect to login 1')
        }else{
            var pbkey = fs.readFileSync('./keys/publicKey.pem', {encoding:'utf8'})
            const payload = jwt.verify(user_token, pbkey, {ignoreExpiration: true} )
            user_email = payload.email;
           user_role = payload.role;
            if(payload.role != 'admin'){
                res.locals.isAdmin = false
                next()

            }else if(payload.role == 'admin'){
                res.locals.isAdmin = true
                next()
            }
            }
    }

    var isLoggedIn =  (req, res, next)=>{
        // console.log(req);


        user_token = req.cookies.token
        console.log(user_token);


        if(!user_token){
            res.status(401).redirect('/login')
        }else{
            var pbkey = fs.readFileSync('./keys/publicKey.pem', {encoding:'utf8'})
            jwt.verify(user_token, pbkey, { algorithm : 'RS256'}, (err, decoded)=>{
                if(err){
                    if(err.name == 'TokenExpiredError'){
                        console.log('expired');
                        transport.get('http://127.0.0.1:3000/refreshtoken', { headers : {
                        authorization : user_token}})
                        .then(response=>{
                            console.log(response.data);
                            res.locals.newToken = response.data.userToken
                            next()
                        }).catch(err=>{
                            console.log(err.response.data);
                            res.redirect('/login')
                            })

                    }else{
                        res.status(401).send('redirect to login 1')
                    }

                }else{
                    res.locals.newToken = user_token
                    next()

                }

            })
    }
    }

   var isLoggedInANDadmin = [isLoggedIn, isAdmin]
   var isLoggedInANDworker = [isLoggedIn, isWorker]
   var combined = [isLoggedIn, isWorker, isAdmin]



   /*
Upload and storage options for multer to upload multiple file with file extension check.
STARTS HERE!!
*/

// multer settings //
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        var des = './public/uploads/' + profileID + '/';
        console.log('destination'+des);

        callback(null, des);
    },
    filename: function(req, file, callback) {
        fileName = file.originalname
        callback(null, fileName);
        //var app = express();
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        // var path = file.path;
        var ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
            console.log('File type not supported');
            return cb(new Error('File type not supported'))
        }
        cb(null, true)
    }


}).array('photo', 10);

  /*
  multer configurations
  ENDS HERE
  */


    app.post('/addartist', isLoggedInANDworker, (req, res)=>{
        var userData = new artistData()
        var date = new Date()
        var userModel = new User()
        profileID = crypto.createHash('md5').update(userModel.hashPassword(req.body.email)).digest('hex');
        fs.mkdir('./public/uploads/' + profileID, (err) => {
            if(err){
                console.log('error in creating folder' + err);
            }else{
                console.log('folder created')
            }
        });

        upload(req, res, function(err) {
            if (err) {
                return res.end("Error uploading file."+ err);
            } else {

                userData._id = profileID
                userData.iam = req.body.ima
                userData.profileType = req.body.type
                userData.firstName = req.body.firstName
                userData.middleName = req.body.middleName
                userData.displayName = req.body.firstName   //display name by default first name
                userData.lastName = req.body.lastName
                userData.gender = req.body.gender
                userData.email = req.body.email
                userData.contactNumber = req.body.contactNumber
                userData.facebook = req.body.facebook
                userData.twitter = req.body.twitter
                userData.instagram = req.body.instagram
                userData.city = req.body.city
                userData.country = req.body.country
                userData.geoLocation = req.body.geoLocation
                userData.address = req.body.address
                userData.website = req.body.website
                var pbkey = fs.readFileSync('./keys/publicKey.pem', {encoding:'utf8'})
                const payload = jwt.verify(res.locals.newToken, pbkey, {ignoreExpiration: true} )
                userData.updatedBy = payload.email
            //  console.log(payload.email);
                userData.updatedOn.day = date.getDate()
                var weekDay = date.getDate();
            // console.log(weekDay);
                weekDay = Math.floor(weekDay/7);
                //console.log(weekDay);
                userData.updatedOn.week = weekDay;
                userData.updatedOn.month = date.getMonth()
                userData.updatedOn.year = date.getFullYear()
                userData.save().then((data, err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                        res.cookie('token', res.locals.newToken)
                        res.send("<script>alert('Artist data updated Successfully'); window.location = '/dashboard';</script>");
                    }
                })

                console.log("File is uploaded");
            }

        });

        })



    app.get('/dashboard', combined, (req, res) =>{

        var d = new Date();
        var month = d.getMonth();
        var weekDay = d.getDate();
        weekDay = Math.floor(weekDay/7)

        if(res.locals.isAdmin){
            role = "admin"
            artistData.find({"updatedOn.month": { $eq: month } }).countDocuments((err,data)=>{
                if(err)
                {
                    console.log('error occured'+err);
                }else{
                   entriesMonth = data
                }
            })
            artistData.find({"updatedOn.week": { $eq:  weekDay} }).then((data,err)=>{
                if(err)
                {
                    console.log('error occured'+err);
                }if(data){
                  //  console.log(data.length);
                   entriesWeek =  data.length
                   console.log(entriesWeek);
                   console.log(entriesMonth)
                    var detail  = {
                        "role": 'admin',
                        "entriesMonth": entriesMonth,
                        "entriesWeek": entriesWeek
                    }
                    console.log(detail);
                    res.cookie('token', res.locals.newToken)
                    res.render('dashboard', {data : detail})
                    }
            })


        }else if(res.locals.isWorker){
            role = "worker"
            var pbkey = fs.readFileSync('./keys/publicKey.pem', {encoding:'utf8'})
            const payload = jwt.verify(res.locals.newToken, pbkey, {ignoreExpiration: true} )
            updatedby = payload.email
            artistData.find({updatedBy: updatedby, "updatedOn.month":{ $eq: month }  }).countDocuments((err,data)=>{
                if(err)
                {
                    console.log('error occured'+err);
                }else{
                    console.log(data)
                    res.locals.entriesMonth = data
                }
            })
            artistData.find({updatedBy: updatedby, "updatedOn.week":{ $eq: weekDay }  }).countDocuments((err,data)=>{
                if(err)
                {
                    console.log('error occured'+err);
                }else{
                    entriesWeek = data
                    // console.log(entriesWeek);
                    // console.log(entriesMonth)
                    var detail  = {
                        "role": "worker",
                        "entriesMonth": res.locals.entriesMonth,
                        "entriesWeek": entriesWeek
                    }
                    console.log(detail);
                    res.cookie('token', res.locals.newToken)
                    res.render('dashboard', {data : detail})

                }
            })

        }
    })

    app.get('/addartist', isLoggedInANDworker, (req,res)=>{
        res.cookie('token', res.locals.newToken)
        res.render('addartistform')
    })
    app.get('/entrieslist', combined, (req,res) =>   {

        if(res.locals.isAdmin){
            artistData.find().then((data,err)=>{
                if(err)
                {
                    console.log('error occured'+err);

                }else{
                    res.cookie('token', res.locals.newToken)
                    res.render('entryTable', {data: data, role : "admin"})
                }
            })

        }else if(res.locals.isWorker){
            var pbkey = fs.readFileSync('./keys/publicKey.pem', {encoding:'utf8'})
            const payload = jwt.verify(res.locals.newToken, pbkey, {ignoreExpiration: true} )
            updatedby = payload.email
            artistData.find({updatedBy: updatedby}).then((data,err)=>{
                if(err)
                {
                    console.log('error occured'+err);
                }else{
                    res.cookie('token', res.locals.newToken)
                    res.render('entryTable', {data: data, role : "worker"})
                }
            })
        }
    })

    app.get('/viewartist', combined, (req, res) =>{
        artistData.findOne({_id : req.query.id}).then((data, err)=>{
            if(err){
                console.log(err)
            }else{
                var directoryPath = "public/uploads/"+req.query.id+"/"
                fs.readdir(directoryPath, function (err, files) {
                    //handling error
                    if (err) {
                        return console.log('Unable to scan directory: ' + err);
                    } else{
                        res.cookie('token', res.locals.newToken)
                        res.render('viewArtist', {data : data, files : files})
                    }
                });


            }
        })
    })
    app.get('/delete', combined, (req, res) =>{
        artistData.deleteOne({_id : req.query.id}).then((data)=>{
            if(data){
                console.log(data)
                res.cookie('token', res.locals.newToken)
                res.send("<script>alert('Delated Successfully'); window.location = '/entrieslist';</script>");
            }else{
                console.log('error while deleting record')
            }
        })
    })

    app.get('/editartist', isLoggedInANDworker, (req, res)=>{
        artistData.findOne({_id : req.query.id}).then((data, err)=>{
            if(err){
                console.log(err)
            }else{
                var directoryPath = "public/uploads/"+req.query.id+"/"
                fs.readdir(directoryPath, function(err, files){
                    if(err){
                        console.log(err);
                    }else{
                        res.cookie('token', res.locals.newToken)
                        res.render('editArtist', {data : data, files: files})
                    }
                })

            }
        })
    })

    app.post('/updateartist', isLoggedInANDworker, (req, res)=>{

                          id = req.body.id
                        iam = req.body.ima
                        profileType = req.body.type
                        gender = req.body.gender
                        firstName = req.body.firstName
                        middleName = req.body.middleName
                        lastName = req.body.lastName
                        email = req.body.email
                        title = req.body.title
                        description = req.body.description
                        estimatedTime = req.body.estimatedTime
                        pricePerHour = req.body.pricePerHour
                        from = req.body.from
                        to = req.body.to
                        views = req.body.views
                        contactNumber = req.body.contactNumber
                        facebook = req.body.facebook
                        twitter = req.body.twitter
                        instagram = req.body.instagram
                        city = req.body.city
                        tags = req.body.tags
                        country = req.body.country
                        geoLocation = req.body.geoLocation
                        address = req.body.address
                        website = req.body.website
                        var pbkey = fs.readFileSync('./keys/publicKey.pem', {encoding:'utf8'})
                        const payload = jwt.verify(res.locals.newToken, pbkey, {ignoreExpiration: true} )
                        updatedBy = payload.email
                        artistData.updateOne({ _id: id }, {iam: iam, profileType: profileType,gender:gender, firstName: firstName, middleName: middleName, lastName: lastName, email: email, title: title, description: description, estimatedTime: estimatedTime, pricePerHour: pricePerHour, time : { to: to, from: from}, views:views, contactNumber: contactNumber, facebook: facebook,
                                                            twitter: twitter, instagram: instagram, city: city, tags: tags, country: country, geoLocation:geoLocation, address: address, website: website, updatedBy: updatedBy
                            }).
                        exec().then((data, err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(data);
                                res.cookie('token', res.locals.newToken)
                                res.send("<script>alert('Artist data updated Successfully'); window.location = '/dashboard';</script>");
                            }
                        })
                })
    app.post('/uploadImages', isLoggedInANDworker, function(req,res){
       profileID = req.query.id
        upload(req, res, function(err) {
            if (err) {
                return res.end("Error uploading file."+ err);
            } else {
                res.redirect('/editartist?id='+profileID);
            }

        });
    })



    // Admin features
    app.get('/users', isLoggedInANDadmin, (req, res)=>{
        User.find({role: "worker"}).then((data,err)=>{
            if(err)
            {
                console.log('error occured'+err);

            }else{
                res.cookie('token', res.locals.newToken)
                res.render('listusers', {data: data})
            }
        })
       // res.render('listusers')
    })

    app.get('/deactiveuser', isLoggedInANDadmin, (req, res) =>{
        var email = req.query.email
        //console.log(email)
        User.updateOne({email: email}, {active: "false"}).exec().then((data, err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.cookie('token', res.locals.newToken)
                res.send("<script>alert('user deactivated'); window.location = '/users';</script>");

            }
        })
    })
    app.get('/activeuser', isLoggedInANDadmin, (req, res) =>{
        var email = req.query.email
        //console.log(email)
        User.updateOne({email: email}, {active: "true"}).exec().then((data, err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.cookie('token', res.locals.newToken)
                res.send("<script>alert('user activated'); window.location = '/users';</script>");

            }
        })
    })
    app.get('/workdetails', isLoggedInANDadmin, function(req, res){

        artistData.find({updatedBy: req.query.email }).then((data, err)=>{
            if(err){
                console.log(err)
            }else{
               // console.log(data.length)
                res.cookie('token', res.locals.newToken)
                res.render('viewWork', {data: data, total: data.length})
            }
        })
        // artistData.find({updatedBy: req.query.email,  "updatedOn.week":{ $eq: weekDay } }).then((data,err)=>{
        //     if(err){

        //     }
        //     else{
        //         weekEntries = data.length
        //        }
        // })
        // artistData.find({updatedBy: req.query.email,  "updatedOn.month":{ $eq: month } }).then((data,err)=>{
        //     if(err){

        //     }
        //     else{
        //         monthEntries = data.length
        //        }
        // })


      //  res.render('viewWork')
    })








    app.get('/getgeolocation', function(req, res){
        var country = req.query.country
        axios.get("https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q="+country+"&format=json&limit=1")
        .then(response => {
            console.log(response);
            console.log(response.data[0]['lat']);
            console.log(response.data[0]['lon']);
            res.cookie('token', res.locals.newToken)
           res.send(response.data[0]['lat']+","+response.data[0]['lon'])
        })
        .catch(error => {
            console.log(error);
        });

    })

    app.get('/', function(req, res){
        res.redirect('/login')
    })

    app.get('/remove', function(req,res){
        var filepath = "public/uploads/"+req.query.p1+"/"+req.query.p2+"";
        console.log(filepath);

        fs.unlink(filepath, (err) => {
            if (err) throw err;
            console.log('successfully deleted ');
            res.status(200);
            res.send('Deleted');
          });
    })



    



// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "tattoo"
//   });
// app.get('/sql', (req, res)=>{
//     db = req.params.db;
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         var sql = "SELECT * FROM "+db;
//         con.query(sql, function (err, result) {
//             if (err){
//                 throw err;
//             }
//             else{
//                 result.forEach(myresult =>{
//                   tattooDB = new tattooData;
//                   tattooDB.name = myresult.name;
//                   tattooDB.location = myresult.location;
//                   tattooDB.website = myresult.website;
//                   tattooDB.facebook = myresult.facebook;
//                   tattooDB.instagram = myresult.instagram;
//                   tattooDB.twitter = myresult.twitter;
//                   tattooDB.phone = myresult.phone;
//                   tattooDB.save().then((data, err)=>{
//                       if(err){
//                           console.log(err);
//                           //res.send("1 record Failed")
//                       }
//                       else{
//                           console.log(data);
//                           res.send("1 record added to mongo DB")
//                       }
//                     }).catch(error=>{
//                         console.log(error);
//                         res.status(500).json({
//                             code : 'failure'
//                         })
//                     })
//                 })
//             }
//             // console.log(result);
//            // res.send(result);
//         });
//       });


// })




}
