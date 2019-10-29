var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var loginRouter    = require('./routes/login');
var registerRouter = require('./routes/register');
var listRouter     = require('./routes/list');
var chatRouter     = require('./routes/chatapp');
var errRouter      = require('./routes/errorpage');
var apiRouter      = require('./routes/api');
var logoutRouter   = require('./routes/logout');

var app = express();

var MyID = "";
var MyName ="";
var FrID = "";
var FrName ="";
var botTimer;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/auth', loginRouter);
app.use('/register', registerRouter);
app.use('/home', listRouter);
app.use('/chat', chatRouter);
app.use('/errorpage', errRouter);
app.use('/api/messages', apiRouter);
app.use('/logout', logoutRouter);

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
