var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');

var session = require('express-session');

var RedisStore = require('connect-redis')(session);

var app = express();

// view engine setup
app.engine('html', ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
    store: new RedisStore({
      host: "10.0.4.116",
      port: 6379,
      db: "0"
    }),
  resave:false,
  saveUninitialized:true,
  secret: 'keyboard cat',
  cookie: {maxAge: 100000}
}))

// app.use(session({  
//   resave: true, // don't save session if unmodified  
//   saveUninitialized: false, // don't create session until something stored  
//   secret: 'love'  
// }));  

app.use(function(req,res,next){  
  if (!req.session.user) {  
      if(req.url=="/login"){  
          next();//如果请求的地址是登录则通过，进行下一个请求  
      }  
      else  
      { 
        res.redirect('/login');  

      }  
  } else if (req.session.user) {  
      next();  
  }  
}); 

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
