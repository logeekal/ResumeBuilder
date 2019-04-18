express = require('express');

router = express.Router();

router.get('/', function(req,res, next) {
    res.send('API is working perfectly.');
});

module.exports = router;