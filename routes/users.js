var express = require('express');
var router = express.Router();

// importing models
var User = import('/models/user.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/login', function(req, res, next){
  //get form value
  let email = req.body.email;
  let password = req.body.password;
});

router.post('/register', function(req, res, next){
  //get form value
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let password2 = req.body.password2;

  // validation express-validator
  req.checkBody('username', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Incorect Email').isEmail();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password2', 'password do not match').equals(req.body.password);

  // check err
  var err = req.validationErrors();
  if(err){
    res.render('register', {
      errors : err,
      username: name,
      email: email,
      password: password,
      password2: password2
    });
  }else{
    var newUser = new User({
      name: name,
      email: email,
      password: password
    });

    // create user
    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user); 
    });

    //succes  message
    req.flash('success', 'Registration success');
    
    // redirect
    res.location('/');
    res.redirect('/');
  }

});

module.exports = router;
