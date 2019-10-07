require('dotenv').config()
const fs = require('fs')


module.exports = (app, User, jwt, refreshTokenModel, transport)=>{
    

    var isLoggedIn =  (req, res, next)=>{
        // console.log(req);
        

        user_token = req.cookies.token
        console.log(user_token);
        

        if(!user_token){
            res.status(401).send('redirect to login')
        }else{
            var pbkey = fs.readFileSync('./keys/publicKey.pem', {encoding:'utf8'})
            jwt.verify(user_token, pbkey, { algorithm : 'RS256'}, (err, decoded)=>{
                if(err){
                    if(err.name == 'TokenExpiredError'){
                        console.log('expired');
                        transport.get('http://127.0.0.1:3000/refreshtoken', { headers : {
                        Authorization : user_token}})
                        .then(response=>{
                            console.log(response.data);
                            res.locals.newToken = response.data.userToken
                            next()
                        }).catch(err=>{
                            console.log(err.response.data);
                            res.send(err.response.data)
                            })
                        
                    }else{
                        res.status(401).send('redirect to login')
                    }
                    
                }else{
                    res.locals.newToken = user_token
                    next()
                    
                }
                
            })
    }
    }

    app.post('/login', (req, res)=>{
        email = req.body.email
        password = req.body.password
        
        if(!email || !password){
            res.status(401).json({
                code : 'error',
                msg : 'Credentials not provided'
            })
        }else{
        User.findOne({email}, (err, user)=>{
            
            if(err){
                console.log(err);
                res.status(501).json({
                    code : 'error',
                    msg : 'Error in database Login'
                })
            }else{
            if(user == null){
                res.status(401).redirect('/login')
            }else{
                if(user.active == 'false'){
                    res.status(401).json({
                        code : 'error',
                        msg : 'Account not Activated'
                    })
                }else{
                    var isPAssMatched = user.matchPassword(password, user.password)
                    if(isPAssMatched){
                        var pvkey = fs.readFileSync('./keys/privateKey.pem', {encoding : 'utf8'})
                        userToken = jwt.sign({
                            email : user.email,
                            role : user.role,
                        },
                        pvkey,
                        {
                            expiresIn: 10,
                            algorithm: 'RS256'
                        })

                        var refToken = new refreshTokenModel()


                        hashedRefreshJWT = refToken.hashToken(userToken)


                        refreshTokenModel.updateOne({_id : user.email}, {userJWT : userToken, refreshJWT : hashedRefreshJWT}, {upsert : true}, (error, data)=>{
                            if(error){
                                console.log(error);
                            }
                            if(data){
                                res.cookie('token', userToken)
                                // res.status(200).json({
                                //                 code : 'success',
                                //                 msg : 'user successfully logged in',
                                //                 userToken
                                //             })
                            res.redirect('/dashboard')
                            }
                        })

                    }else{
                        res.status(401).json({
                            code : 'error',
                            msg : 'The user login attempt failed'
                        })
                    }
                }
           }
        }
        })
    }
    })

    app.get('/logout', (req, res)=>{
        console.log('logging out');
        user_token = req.cookies.token
  
        refreshTokenModel.findOneAndDelete({userJWT : user_token}, (err, data)=>{
            if(err){
                console.log(err);
                res.status(501).json({
                    code : 'error',
                    msg : 'Databse error',
                    userToken
                })
            }if(data){
                console.log(data);
                res.clearCookie('token')
                // res.status(200).json({
                //     code : 'success',
                //     msg : 'user successfully logged out', 
                // })
                res.send("<script>alert('Logged out Successfully'); window.location = '/login';</script>")
            }else{
                res.clearCookie('token')
                // res.status(200).json({
                //     code : 'success',
                //     msg : 'user successfully logged out', 
                // })
                res.send("<script>alert('Logged out Successfully'); window.location = '/login';</script>")
            }
        })

    })

    app.get('/safe', isLoggedIn, (req, res)=>{
        res.cookie('token', res.locals.userToken)
        res.send('safe area')
    })
    app.get('/login',(req,res)=>{
        res.render('login')
    })

    app.get('/refreshtoken', (req, res)=>{
        //console.log(req);
        
        var access_token = req.headers.authorization


        refreshTokenModel.findOne({userJWT : user_token}, (err, data)=>{
            if(err){
                console.log(err);
                res.status(401).send('redirect to login 0')
            }
            if(data == null){
                res.status(401).send('redirect to login 100')
            }else{
                refreshTokenModelInstance = new refreshTokenModel()
                var pbkey = fs.readFileSync('./keys/publicKey.pem', {encoding:'utf8'})
                const payload = jwt.verify(access_token, pbkey, {ignoreExpiration: true} )
                var pvkey = fs.readFileSync('./keys/privateKey.pem', {encoding : 'utf8'})
                userToken = jwt.sign({
                    email : payload.email,
                    role : payload.role,
                },
                pvkey,
                {
                    expiresIn: 10,
                    algorithm: 'RS256'
                })
                var refToken = new refreshTokenModel()
                hashedRefreshJWT = refToken.hashToken(userToken)
                refreshTokenModel.updateOne({_id : payload.email}, {userJWT : userToken, refreshJWT : hashedRefreshJWT}, {upsert : true}, (error, data)=>{
                    if(error){
                        console.log(error);
                        
                    }
                    if(data != null){
                        console.log('new issued');
                        res.status(200).json({
                            userToken
                        })
                        
                    }else{
                        res.status(401).send('redirect to login 1000')
                    }
                }) 
                
            }
        })



                                   


    })


}