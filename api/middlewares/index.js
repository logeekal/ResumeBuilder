const JWT_SECRET = require("../config").JWT_SECRET;
const jwt = require("jsonwebtoken");

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
      jwt.verify(token,JWT_SECRET, function(err, decoded){
        console.log(err);
        console.log(decoded);
          if(err){
              res.status(401).send(`Not Authorized : ${err}`);
          }else{
              req.email = decoded.email;
              next();
          }
      })
  }
};

module.exports = {withAuth}
