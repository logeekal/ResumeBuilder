var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('In root')
  if(req.session){
    console.log(req.session)
    console.log(req.session.id)
  }

  res.render('index', { title: 'Express' });
});

module.exports = router;
