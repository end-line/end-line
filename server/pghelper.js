"use strict";

let dotenv = require('dotenv-safe');
dotenv.load({
  allowEmptyValues: true
});

let pg = require('pg'),
    config = require('./config'),
    databaseURL = config.databaseURL;

exports.query = function (sql, values, singleItem, dontLog) {

  if (!dontLog) {
    console.log(sql, values);
  }

  return new Promise((resolve, reject) => {
    pg.defaults.ssl = true;
    pg.types.setTypeParser(1114, str => str);
    pg.connect(databaseURL, function (err, conn, done) {
      if (err) { return reject(err); }
      try {
        conn.query(sql, values, function (err, result) {
          done();
          if (err) {
            reject(err);
          } else {
            resolve(singleItem ? result.rows[0] : result.rows);
          }
        });
      }
      catch (e) {
        done();
        reject(e);
      }
    });

  });

};
