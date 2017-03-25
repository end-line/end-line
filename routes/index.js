"use strict";

let express = require('express'),
    passport = require('passport'),
    queries = require('../server/queries'),
    xml = require('../server/xml'),
    router = express.Router();

router.get('/', function (req, res, next) {
  // console.log(req.flash('loginMessage'));
  // console.log(req.flash('signupMessage'));
  return res.render('pages/index', {
    message: req.flash('loginMessage') || req.flash('signupMessage'), 
    username: req.user ? req.user.username : null
  });
});

router.get('/about', function (req, res, next) {
  return res.render('pages/about', {
    username: req.user ? req.user.username : null
  });
});

router.get('/news', function (req, res, next) {
  return res.render('pages/news', {
    username: req.user ? req.user.username : null
  });
});

router.get('/contact', function (req, res, next) {
  return res.render('pages/contact', {
    username: req.user ? req.user.username : null
  });
});

router.get('/privacypolicy', function (req, res, next) {
  return res.render('pages/privacypolicy', {
    username: req.user ? req.user.username : null
  });
});

router.get('/tos', function (req, res, next) {
  return res.render('pages/tos', {
    username: req.user ? req.user.username : null
  });
});

router.get('/upload', function(req, res, next) {
  return res.render('pages/upload', {
    username: req.user ? req.user.username : null
  });
});

router.get('/encodesubmission', function(req, res, next) {
  return res.render('pages/encodesubmission', {
    username: req.user ? req.user.username : null
  });
});

router.get('/profile/:username', isLoggedIn, queries.profileInfo, function (req, res, next) {
  console.log(res.locals.profileInfo)
  let profileInfo = res.locals.profileInfo;
  return res.render('pages/profile', {
    username: req.user ? req.user.username : null,
    profileInfo: res.locals.profileInfo
  });
});

router.get('/logout', function (req, res, next) {  
  req.logout();
  return res.redirect('/');
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', {failureFlash: true}, function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/profile/' + user.username);
    });
  })(req, res, next);
});

router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', {failureFlash: true}, function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/profile/' + user.username);
    });
  })(req, res, next);
});

router.get('/validate', function (req, res, next) {
  let str = '<TEI xmlns="http://www.tei-c.org/ns/1.0"><yes p:id="yeah">ff<yes>fgfM</yes>gf</yes> /n <sysy>d<dd><FF text="p98">jd</FF><hhh></sysy></dd></hhh>jdjd</TEI>'.replace(/\/n/g, "");

  xml.validate(str, function (status, message) {
    return res.json(message);
  })
});

module.exports = router;

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
