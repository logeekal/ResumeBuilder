const { addUser, getUser } = require("../utils/DButils");
const { User } = require("../models/users");

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
  console.log(req);
  try {
    const { email, password } = req.body;

    const user = new User({ email, password });

    user.save(err => {
      if (err) {
        res
          .status(500)
          .send(`Error registering the user. Error occured ${err}`);
      } else {
        res.status(200).send(`Welcome to CV Builder.`);
      }
    });
  } catch (err) {
      console.log(err);
    res.status(500).send(`Some error occured`);
  }
});

module.exports = router;
