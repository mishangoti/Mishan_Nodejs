var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('aboutus', { title: 'About Us' });
});

// router.get('/user', function(req,res,next){
//   res.render('user', {title: 'User'});
// });
module.exports = router;
