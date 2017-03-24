"use strict";

let LocalStrategy = require('passport-local').Strategy,
    db = require('../server/pghelper'),
    crypto = require('crypto');

let createSalt = () => crypto.randomBytes(32).toString('hex'); //creates salt for password

let createHash = (string) => crypto.createHash('sha256').update(string).digest('hex'); //hashes password

module.exports = function (passport) {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.query("SELECT id, username FROM users WHERE id = $1", [id], true)
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
      return db.query("SELECT username FROM users WHERE username = $1", [username], true)
        .then(user => {
          if(user) {
            return done(null, false, req.flash('signupMessage', 'That username is already in use'));
          }
          else {
            let salt = createSalt();
            let hashedPassword = createHash(password + salt);
            return db.query("INSERT INTO users (username, password, salt) VALUES ($1, $2, $3)", [username, hashedPassword, salt])
              .then(() => {
                return db.query("SELECT id, username FROM users WHERE username = $1 AND password = $2", [username, hashedPassword], true)
                  .then(user => {
                    if(user) {
                      db.query("INSERT INTO profile (id, email) VALUES ($1, $2)", [user.id, req.body.email]);
                      return done(null, user);
                    }
                    else { return done(null, false, req.flash('loginMessage', 'Weird error')); }
                  })
                  .catch(err => {
                    return done(err);
                  });
              })
              .catch(err => {
                return done(err);
              });
          }
        })
        .catch(err => {
          return done(err);
        });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    return db.query("SELECT salt FROM users WHERE username = $1", [username], true)
      .then(user => {
        if(user) {
          return db.query("SELECT id, username FROM users WHERE username = $1 AND password = $2", [username, createHash(password + user.salt)], true)
            .then(user => {
              if(user) { return done(null, user); }
              else { return done(null, false, req.flash('loginMessage', 'Wrong password')); }
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
