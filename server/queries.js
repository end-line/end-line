"use strict";

let db = require('./pghelper');

let test = (req, res, next) => {
  let sql = "SELECT username FROM users";

  db.query(sql, [])
    .then(users => {
      return res.render('testpage', {
        title: 'Test Page',
        users: users,
        test : [{name:"yes",type:"yay",xml:req.body.xml}]
      });
    })
    .catch(next);
};

exports.test = test;
