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
    validateXML = require('./server/validate'),
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

require('./server/passport')(passport);

app.use('/', routes);

app.use('/public', express.static(path.join(__dirname, 'public')));

let str = '<yes p:id="yeah">ff<yes>fgfM</yes>gf</yes> /n <sysy>d<dd><FF text="p98">jd</FF><hhh></sysy></dd></hhh>jdjd'.replace(/\/n/g, "");
console.log(validateXML(str));

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
