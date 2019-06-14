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
                    const payload = {email};
                    const token = jwt.sign(payload,JWT_SECRET,{
                        expiresIn:'1h'
                    });
                   
                    
                    res.cookie('token', token, {httpOnly : true});
                    console.log(res);
                    console.log("========================================================")
                    res.send();
                }
            })

        }
    })

});

module.exports = router ;