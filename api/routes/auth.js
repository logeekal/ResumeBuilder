const corsOptions = require('../app').corsOptions;
const User = require('../models/users').User;
const JWT_SECRET = require('../config').JWT_SECRET;
var express = require("express");
const jwt = require('jsonwebtoken');
var cors = require('cors');


router = express.Router();

router.get("/", cors(corsOptions), function(req, res, next) {
    res.send(" Auth API is working perfectly.");
  });


router.post('/', async function(req,res,next){
    const {email, password} = req.body;
    const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;


    User.findOne({email}, function(error, user){
        if(error){
            console.log(`Cannot find user ${err}`);
            res.status(500).json({
                error : 'Internal Error Occured'
            })
        }else if(!user){
            res.status(401).json({
                error:`No user found with email ${email}`
            })
        }else{
            console.log(`Found the user with email ${email}. Now Authenticating`);
            user.isCorrectPassword(password, function(error, same){
                if(error && !same){
                    res.status(401).json({
                        error : 'Password does not match. Sorry!'
                    })
                }else if(same == ""){
                    res.status(401).json({
                        error: `Some Error occured ${error}`
                    })
                }else{
                    /**
                     * Success scenario. IF password matches,
                     * we will issue a JWT.
                     *  
                     * */

                  


                    console.log(`Now sending tokens`)
                    req.session.email = email;
                    req.session.save(function(err){
                        if(err !== false && err !== null && err !== undefined){console.log(`Error Saving session`);
                        console.log(err)}
                        else{
                            console.log(`Session saved correctly. ${req.session.id}`)
                            console.log(req.session)
                        }
                    })
                
                    req.sessionStore.set(token,req.session, function(err){
                        if(err){
                            console.log(`Error in setting the session in DB ${err}`);
                        }else{
                            console.log('Session stored. ');
                        }
                    })
                    //Replace JWT with Sessions.
                    // const payload = {email};
                    // const token = jwt.sign(payload,JWT_SECRET,{
                    //     expiresIn:'1h'
                    // });
                   
                    
                    //res.cookie('token', req.session.id , {httpOnly : true});
                    console.log(res);
                    console.log("========================================================")
                    res.send();
                }
            })

        }
    })

});


router.post('/logout', function(req, res, next){
    console.log('In logout Now.');
    const token = req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;  

    req.sessionStore.get(token, function(err, session){
        if(!session){
            console.log('Session Not found anyways');
            res.sendStatus(200);
        }else{
            console.log(`Session found with SID : ${token}. Now destroying it.`);
            req.sessionStore.destroy(token, function(err){
                if(err !== undefined || err !== null || err != false)
                console.log(`Error destorying session`);
                console.log('Session destroyed successfully.');
                res.sendStatus(200);
            })
        }
    })

});

module.exports = router ;