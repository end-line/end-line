"use strict";

let express = require('express'),
    compression = require('compression'),
    path = require('path'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    queries = require('./server/queries'),
    dotenv = require('dotenv-safe'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    routes = require('./routes/index'),
    flash = require('connect-flash'),
    logger = require('morgan'),
    app = express();

app.set('port', process.env.PORT || 8080); //sets port

dotenv.load({
  allowEmptyValues: true
});

app.use(serveStatic(path.join(__dirname, 'public')));
app.use("/moment", serveStatic(path.join(__dirname, 'node_modules/moment/')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: 'teisecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Handles log in and sing up form fields for rerender
app.use(function(req,res,next) {
  res.locals.first_name = req.flash('first_name')[0] || "";
  res.locals.last_name = req.flash('last_name')[0] || "";
  res.locals.email = req.flash('email')[0] || "";
  res.locals.username = req.flash('username')[0] || "";
  res.locals.title = req.flash('title')[0] || "";
  res.locals.author = req.flash('author')[0] || "";
  res.locals.genre = req.flash('genre')[0] || "";
  res.locals.lines = req.flash('lines')[0] || "";
  res.locals.poem_check = req.flash('poem_check')[0] || "";
  next();
});

require('./server/passport')(passport);

app.use('/', routes);

//Handle 404
app.use(function(req, res, next) {
  res.status(404).render('pages/404');
});

//Handle 500
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(500).render('pages/500');
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
