"use strict";

let express = require('express'),
    passport = require('passport'),
    router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pages/index');
});

router.get('/about', function(req, res, next) {
  res.render('pages/about');
});

router.get('/news', function(req, res, next) {
  res.render('pages/news');
});

router.get('/contact', function(req, res, next) {
  res.render('pages/contact');
});

router.get('/privacypolicy', function(req, res, next) {
  res.render('pages/privacypolicy');
});

router.get('/tos', function(req, res, next) {
  res.render('pages/tos');
});

router.get('/logout', function(req, res, next) {  
  req.logout();
  res.redirect('/');
});

router.post('/signup', passport.authenticate('local-signup', {  
  successRedirect: '/profile',
  failureRedirect: '/',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {  
  successRedirect: '/profile',
  failureRedirect: '/',
  failureFlash: true,
}));

module.exports = router;

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
