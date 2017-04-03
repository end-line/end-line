"use strict";

let express = require('express'),
    passport = require('passport'),
    queries = require('../server/queries'),
    xml = require('../server/xml'),
    router = express.Router();

router.get('/', function (req, res, next) {
  return res.render('pages/index', {
    username: req.user ? req.user.username : null
  });
});

router.get('/about', function (req, res, next) {
  return res.render('pages/about', {
    username: req.user ? req.user.username : null
  });
});

router.get('/faq', function (req, res, next) {
  return res.render('pages/faq', {
    username: req.user ? req.user.username : null
  });
});

router.get('/news', function (req, res, next) {
  return res.render('pages/news', {
    username: req.user ? req.user.username : null
  });
});

router.get('/signup', function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  return res.render('pages/signup', {
    username: req.user ? req.user.username : null,
    message: req.flash('signupMessage')
  });
});

router.get('/login', function (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  return res.render('pages/login', {
    username: req.user ? req.user.username : null,
    message: req.flash('loginMessage')
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

router.get('/upload', isLoggedIn, function (req, res, next) {
  return res.render('pages/upload', {
    username: req.user ? req.user.username : null
  });
});

router.get('/encodesubmission', isLoggedIn, function (req, res, next) {
  return res.render('pages/encodesubmission', {
    username: req.user ? req.user.username : null
  });
});

router.get('/compare', isLoggedIn, function (req, res, next) {
  return res.render('pages/compare', {
    username: req.user ? req.user.username : null
  });
});

router.get('/poem/:id', isLoggedIn, queries.getPoem, function (req, res, next) {
  let poem = res.locals.poem;
  return res.render('pages/poem', {
    username: req.user ? req.user.username : null,
    poem: poem
  });
});

router.get('/poem/:id/encoding/:encoded_id', isLoggedIn, queries.getPoem, function (req, res, next) {
  let poem = res.locals.poem;
  return res.render('pages/poem', {
    username: req.user ? req.user.username : null,
    poem: poem
  });
});

router.get('/search', isLoggedIn, queries.searchPoems, function (req, res, next) {
  let poems = res.locals.poems;
  return res.render('pages/search', {
    username: req.user ? req.user.username : null,
    poems: poems
  });
});

router.get('/settings', isLoggedIn, function (req, res, next) {
  return res.render('pages/settings', {
    username: req.user ? req.user.username : null
  });
});

router.get('/encode/:id', isLoggedIn, queries.getPoem, function (req, res, next) {
  let poem = res.locals.poem;
  return res.render('pages/encode', {
    username: req.user ? req.user.username : null,
    poem: poem
  });
});

router.get('/profile/:username', isLoggedIn, queries.profileInfo, queries.getPoemsByUser, queries.getEncodingsByUser, function (req, res, next) {
  let profileInfo = res.locals.profileInfo;
  let poems = res.locals.poems;
  let encodings = res.locals.encodings;
  return res.render('pages/profile', {
    username: req.user ? req.user.username : null,
    profile: res.locals.profileInfo,
    poems: poems,
    encodings: encodings
  });
});

router.get('/logout', function (req, res, next) {  
  req.logout();
  return res.redirect('/');
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', {failureFlash: true}, function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/profile/' + user.username);
    });
  })(req, res, next);
});

router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', {failureFlash: true}, function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/signup'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/profile/' + user.username);
    });
  })(req, res, next);
});

router.post('/submit', queries.addPoem, function (req, res, next) {
  let poem = res.locals.poem;
  return res.redirect('/poem/' + poem.id);
});

router.post('/submitencode', queries.addPoem, function (req, res, next) {
  let poem = res.locals.poem;
  return res.redirect('/encode/' + poem.id);
});

router.post('/poem/:id/encode', queries.encodePoem, function (req, res, next) {
  return res.redirect('/poem/' + req.params.id);
});

router.post('/validate', function (req, res, next) {
  let str = '<TEI xmlns="http://www.tei-c.org/ns/1.0"><yes p:id="yeah">ff<yes>fgfM</yes>gf</yes> /n <sysy>d<dd><FF text="p98">jd</FF><hhh></sysy></dd></hhh>jdjd</TEI>'.replace(/\/n/g, "");
  xml.validate(req.body.original, req.body.encoded, function (status, message) {
    return res.json({status: status, message: message});
  })
});

module.exports = router;

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}
