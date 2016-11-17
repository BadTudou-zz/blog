var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var article = require('./routes/article');
var feature = require('./routes/feature');
var manage = require('./routes/manage');
var conf = require('./conf/conf');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  name:'token',
  domain: 'www.badtudou.com',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 * 1,
    secure: false },
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/article', article);
app.use('/article', express.static(path.join(__dirname, conf.system.articleStorePath)));
app.use('/feature', feature);
app.use('/manage', manage);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//app.listen(80);
module.exports = app;
