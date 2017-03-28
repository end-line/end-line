"use strict";

let db = require('./pghelper');

let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

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

let searchPoems = (req, res, next) => {
  let search = req.query.search,
      whereParts = [],
      values = [];

  if (search) {
    values.push(escape(search));
    whereParts.push("title || author ~* $" + values.length);
  }

  let where = whereParts.length > 0 ? ("WHERE " + whereParts.join(" AND ")) : "";

  let sql = "SELECT id, title, author " +
              "FROM poems " + where +
              " ORDER BY title";

  db.query(sql, values)
    .then(poems => {
      res.locals.poems = poems;
      return next();
    })
    .catch(next);
};

let addPoem = (req, res, next) => {
  let sql1 = "SELECT id FROM poems WHERE title = $1 AND author = $2;",
      sql2 = "INSERT INTO poems (title, author, body) VALUES ($1, $2, $3);";

  db.query(sql1, [req.body.title, req.body.author], true)
    .then(poem => {
      if (poem) {
        res.locals.poem = "Already exists";
        return next();
      }
      else {
        db.query(sql2, [req.body.title, req.body.author, req.body.lines])
          .then(poem => {
            res.locals.poem = poem;
            return next();
          })
          .catch(next);
      }
    })
    .catch(next);
};

exports.profileInfo = profileInfo;
