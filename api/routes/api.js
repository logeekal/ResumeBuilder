const {addUser, getUser} = require('../utils/DButils');

express = require('express');

router = express.Router();

router.get('/', function(req,res, next) {
    res.send('API is working perfectly.');
});

router.get('/users', async function(req,res,next){
    const {status, error, result} = await addUser({"a":1});
   if(error){
       console.log(error);
       res.send(error);
   }else{
       res.send(result);
   }

})

router.get('/users/:email', async function(req,res,next){
    const email = req.params.email;
    console.log(`Looking for email ${email}`);

    const {status, error, result} = await getUser(email);
    if(error){
       console.log(error);
       res.send(error);
   }else{
       res.send(result);
   }

})

module.exports = router;