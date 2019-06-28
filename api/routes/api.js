const withAuth = require('../middlewares').withAuth;
const resolveMongoError = require('../utils/MongoosErrorHandler').resolveMongoError;
const { addUser, getUser } = require("../utils/DButils");
const { User } = require("../models/users");
const path = require('path');
const fs = require('fs');

express = require("express");

router = express.Router();

router.get("/", function(req, res, next) {
  res.send("API is working perfectly.");
});

/**
 * This should be the documentation of the Rest API for
 * authenticated developers.
 *
 */

router.get("/users", async function(req, res, next) {
  const { status, error, result } = await addUser({ a: 1 });
  if (error) {
    console.log(error);
    res.send(error);
  } else {
    res.send(result);
  }
});

/**
 *
 * This searches for a user with particular email and returns.
 * This is specially a function for signing in.
 * @returns result of share  { status, error, result}
 *          status will be true if there is no error
 *          status will be false if there is an error
 *          Error or result will be populated accordingly.
 *
 */

router.get("/users/:email", async function(req, res, next) {
  const email = decodeURI(req.params.email);
  console.log(`Looking for email ${email}`);

  res.send(await getUser(email));
  //     if(error){
  //        console.log(error);
  //        res.send({status: false});
  //    }else{
  //        res.send(result);
  //    }
});

router.post("/users/add", async (req, res, next) => {
  // console.log(req);
  try {
    const { email, password, profile } = req.body;

    const user = new User({ email, password, profile });


    user.save(err => {
      console.log(typeof(err));
      if (err instanceof Object && err.code === 11000) {
        //User Already exists
        res.status(406);
        res.send(err.errmsg);
        console.log(err.errmsg);
      } else if(!err){
        console.log(200);
        res.status(200).send(`Welcome to CV Builder.`);
      }else{
        throw err;
      }
    });
  } catch (err) {
    // console.log(err);
    res.status(500).send(`Some error occured`);
  }
});


router.post("/users/profile/get", withAuth, async(req, res, next)=>{
  console.log(`Authenticated. Now getting the profile.`)

  const email = req.body.email;
  
  let result = await User.findOne({email : email});
  if(result === null){
    res.sendStatus(404);
  }
  let profile = result.profile;
  //removing Id field from the state
  profile["_id"] = "NA";
  res.status(200);
  res.send(profile);
});


router.post("/users/profile/update", withAuth, async(req, res, next)=>{
  const email = req.body.email;
  const profile = req.body.profile;
  const result = await User.updateOne({email:email}, {profile:profile},{upsert:false});
  console.log(`${result.nModified} documents were updated`);
  if(result.nModified > 0){
    res.sendStatus(200);
  }else{
    res.sendStatus(404);h
  }

})


router.get("/users/profile/avatar/get", withAuth, async(req, res, next)=>{
  const email = req.email;
  const {avatar} = await User.findOne({email: email},{avatar:1});
  
  const avatarFilePath = path.join(__dirname,avatar);
  console.log(avatarFilePath);
  if(fs.existsSync(avatarFilePath)){
    res.status(200);
    res.sendFile(avatarFilePath)
  }else{
    res.status(406);
    res.send(`No avatar Loaded.`);
  }
  
  
})

module.exports = router;
