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
    db.query("SELECT id, username FROM users WHERE id = $1", [id])
      .then(user => {
        done(null, user[0]);
      })
      .catch(err => {
        done(new Error("User with the id ${id} does not exist"));
      })
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    process.nextTick(() => {
      return db.query("SELECT username FROM users WHERE username = $1", [username])
        .then(result => {
          if(result.length !== 0) {
            return done(null, false, req.flash('signupMessage', 'That username is already in use.'));
          }
          else {
            let salt = createSalt();
            let hashedPassword = createHash(password + salt);
            db.query("INSERT INTO users (username, password, salt) VALUES ($1, $2, $3)", [username, hashedPassword, salt])
              .then(result => {
                return db.query("SELECT id, username FROM users WHERE username = $1 AND password = $2", [username, hashedPassword])
                  .then(result => {
                    return done(null, result[0]);
                  })
                  .catch(err => {
                    console.log(err)
                    return done(null, false, req.flash('loginMessage', 'Wrong password.'));
                  });
                })
                .catch(err => {
                  return done(null, false, req.flash('loginMessage', 'Database error.'));
                });
          }
        })
        .catch(err => {
          return done(null, false, req.flash('loginMessage', 'Database error.'));
        });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    return db.query("SELECT salt FROM users WHERE username = $1", [username])
      .then(result => {
        return db.query("SELECT id, username FROM users WHERE username = $1 AND password = $2", [username, createHash(password + result[0].salt)])
          .then(result => {
            return done(null, result[0]);
          })
          .catch(err => {
            console.log(err)
            return done(null, false, req.flash('loginMessage', 'Wrong password.'));
          });
        })
      .catch(err => {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      });
  }));

};
