import express from 'express';
import createError from 'http-errors';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import hbsutils from 'hbs-utils';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
hbsutils(hbs).registerPartials(`${__dirname}/views/partial`);
hbsutils(hbs).registerWatchedPartials(`${__dirname}/views/partial`);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// create session 
// app.set('trust proxy', 1) // trust first proxy
// app.use(cookieSession({
//   name: 'expression',
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
//   })
// );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(`${__dirname}/node_modules/jquery/dist`));
app.use('/bootstrap', express.static(`${__dirname}/node_modules/bootstrap/dist`));
app.use('/font-awesome', express.static(`${__dirname}/node_modules/font-awesome`));
app.use('/customcss', express.static(`${__dirname}/public/stylesheets`));
app.use('/customjs', express.static(`${__dirname}/public/javascripts`));
app.use('/plugins', express.static(`${__dirname}/node_modules/admin-lte/plugins`));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(async (req, res, next) => {
  next(createError(404));
});

// error handler
app.use(async(err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// buat filter login
// function requireLogin(req, res, next) {
//   if (req.session.loggedIn) {
//     next(); // allow the next route to run
//   } else {
//     // require the user to log in
//     res.redirect("/admin/login"); // or render a form, etc.
//   }
// }

module.exports = app;
