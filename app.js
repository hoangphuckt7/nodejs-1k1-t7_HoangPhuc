const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const expressLayouts = require('express-ejs-layouts');

const route = require('./mapp/routes')
const db = require('./mapp/configs/db')
global.__base = __dirname + "/";
global.frontend = global.__base + "mapp/views/shop_frontend"

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'mapp/views/shop_frontend'));
app.set('views', path.join(__dirname, 'mapp/views/admin'));
app.set('view engine', 'ejs');
app.set('layout', 'index');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(expressLayouts);
// connect mongoDB
db.connect()
//ROUTES Init
route(app);

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
  res.render('error',{ pageTitle: 'ErrorPage' });
});
// Object
// notifier.notify({
//   title: 'My notification',
//   message: 'Hello, there!'
// });
module.exports = app;
