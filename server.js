"use strict";

let express = require('express'),
    compression = require('compression'),
    path = require('path'),
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
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);

app.use('/public', express.static(path.join(__dirname, 'public')));

require('./server/passport')(passport);

//Handle 404
app.use(function(req, res, next) {
  res.status(404).send('404: Not Found. You don\'t belong here.');
});

//Handle 500
app.use(function(err, req, res, next) {
  res.status(500).send('500: Internal Server Error');
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
