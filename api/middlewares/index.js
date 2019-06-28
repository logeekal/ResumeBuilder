const JWT_SECRET = require("../config").JWT_SECRET;
const jwt = require("jsonwebtoken");
const sessionStore = require('../app').sessionStore;


const withAuth = function(req, res, next) {
  console.log(`Now authentication : ${req.toString()}`);
 // console.log(req);
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;
    
    console.log(`Token : ${token}`);

  if (!token) {
    res.status(401).send(`Not Authorized`);
  }else{
    req.sessionStore.get(token, function(err, session){
        if(err){
          console.log(`Session not found : Unauthorized : ${token}`)
          res.send(401)
        }else if (session !== undefined && session !== null){
          console.log(err)
          console.log(`Session Validated : ${token} `);
          console.log(session);
          req.email = session.email;
          next();
        }else{
          res.send(401);
        }
      })
      // jwt.verify(token,JWT_SECRET, function(err, decoded){
      //   console.log(err);
      //   console.log(decoded);
      //     if(err){
      //         res.status(401).send(`Not Authorized : ${err}`);
      //     }else{
      //         req.email = decoded.email;
      //         next();
      //     }
      // })
  }
};

module.exports = {withAuth}
