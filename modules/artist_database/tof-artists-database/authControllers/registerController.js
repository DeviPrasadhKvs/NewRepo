require('dotenv').config()
const nodemailer = require('nodemailer')
const fs = require('fs')





module.exports = (app, User)=>{

    var chekEmailExists = function(req, res, next){

        var email = req.body.email

        User.findOne({email}, (err, data)=>{
            if(err){
                console.log(err);   
            }
            if(data){
                console.log(data);
                
                res.send('email exists')
            }else{
                next()
            }
        })
    }
    


    app.post('/register', chekEmailExists, async (req, res, next)=>{
 
        try {
            var userdata = new User()
            userdata.email = req.body.email
            userdata.password = userdata.hashPassword(req.body.password)
            userdata.displayName = req.body.displayName
            userdata.gender = req.body.gender
            userdata.role = req.body.role

            
            userdata.save().then((user, err)=>{
                if(err) { console.log(err);}
                if(user){
                    res.status(200).json({
                        code : 'success',
                        msg : 'user created'
                    })
                }
            })
        }
            catch(e){
                next(e)
            }

        
    })



}