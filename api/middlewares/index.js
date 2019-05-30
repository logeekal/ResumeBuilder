const JWT_SECRET = require("../config").JWT_SECRET;
const jwt = require("jsonwebtoken");

const withAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  if (!token) {
    res.status(401).send(`Not Authorized`);
  }else{
      jwt.verify(token,JWT_SECRET, function(err, decoded){
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
