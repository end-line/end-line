"use strict";

let LocalStrategy = require('passport-local').Strategy,
    db = require('../server/pghelper'),
    crypto = require('crypto');

let createSalt = () => crypto.randomBytes(32).toString('hex'); //creates salt for password

let createSecret = () => crypto.randomBytes(16).toString('hex'); //creates secret for account validation

let createHash = (string) => crypto.createHash('sha256').update(string).digest('hex'); //hashes password

module.exports = function (passport) {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.query("SELECT id, username, valid FROM users WHERE id = $1", [id], true)
      .then(user => {
        if(user) { done(null, user); }
        else { done(new Error("User with the id ${id} does not exist")); }
      })
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    process.nextTick(() => {
      req.flash('first_name', req.body.first_name);
      req.flash('last_name', req.body.last_name);
      req.flash('email', req.body.email);
      req.flash('username', username);
      if(password !== req.body.passwordConfirm) {
        return done(null, false, req.flash('signupMessage', 'Passwords do not match'));
      }
      else {
        return db.query("SELECT u.username FROM users u, profile p WHERE u.id = p.id AND (u.username = $1 OR p.email = $2)", [username, req.body.email], true)
          .then(user => {
            if(user) {
              return done(null, false, req.flash('signupMessage', 'Username or email is already in use'));
            }
            else {
              let salt = createSalt();
              let hashedPassword = createHash(password + salt);
              let secret = createSecret();
              return db.query("INSERT INTO users (username, password, salt, secret) VALUES ($1, $2, $3, $4) RETURNING id, username, valid, secret", [username, hashedPassword, salt, secret], true)
                .then(user => {
                  if(user) {
                    db.query("INSERT INTO profile (id, first_name, last_name, email) VALUES ($1, $2, $3, $4)", [user.id, req.body.first_name, req.body.last_name, req.body.email]);
                    return done(null, user);
                  }
                  else { return done(null, false, req.flash('loginMessage', 'Weird error')); }
                })
                .catch(err => {
                  return done(err);
                });
            }
          })
          .catch(err => {
            return done(err);
          });
      }
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    req.flash('username', username);
    return db.query("SELECT salt, valid FROM users WHERE username = $1", [username], true)
      .then(user => {
        if(user && user.valid === false) {
          return done(null, false, req.flash('loginMessage', 'Account not verified'));
        }
        else if(user && user.valid === true) {
          return db.query("SELECT id, username FROM users WHERE username = $1 AND password = $2", [username, createHash(password + user.salt)], true)
            .then(user => {
              if(user) { return done(null, user); }
              else { return done(null, false, req.flash('loginMessage', 'Incorrect password')); }
            })
            .catch(err => {
              return done(err);
            });
        }
        else {
          return done(null, false, req.flash('loginMessage', 'No user found'));
        }
      })
      .catch(err => {
        return done(err);
      });
  }));

};
