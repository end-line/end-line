"use strict";

let db = require('./pghelper');

let profileInfo = (req, res, next) => {
  let username = req.params.username,
      sql = "SELECT u.id, p.first_name, p.last_name, p.email FROM profile p, users u WHERE u.id = p.id AND u.username = $1";

  db.query(sql, [username], true)
    .then(profileInfo => {
      res.locals.profileInfo = profileInfo;
      return next();
    })
    .catch(next);
};

exports.profileInfo = profileInfo;
