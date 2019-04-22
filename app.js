var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var nodemailer = require('nodemailer');
const session = require('express-session');
var passport = require('passport');
var LocalStratagy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
// var multer = require('multer');
const flash = require('connect-flash');
const mysql = require('mysql');

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_routes'
});
// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// route 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutusRouter = require('./routes/aboutus');
var crudRouter = require('./routes/crud');
// var loginRouter = require('./routes/login');
// var dashboardRouter = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// handle file upload
// app.use(multer({dest: './public/images'}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// express session
app.use(session({
  secret: 'secret',
  resave:true,
  saveUninitialized: true,
  cookie: { secure: true }
 }));
//  passport
app.use(passport.initialize());
app.use(passport.session());
// validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;

    while(namespace.length){
      formParam += '['+ namespace.shift() +']'; 
    }
    return{
      param : formParam,
      msg : msg,
      value : value 
    };
  }
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(flash(app));
app.use(function(req, res, next){
  res.locals.message = require('express-messages')(req,res);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/aboutus', aboutusRouter);
app.use('/crud', crudRouter);
// app.use('/login', loginRouter);
// app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
