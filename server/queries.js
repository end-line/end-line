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
  let search = req.query.q,
      whereParts = [],
      values = [];

  if (search) {
    values.push(escape(search));
    whereParts.push("title || author ~* $" + values.length);
  }

  let where = whereParts.length > 0 ? (" AND " + whereParts.join(" AND ")) : "";

  let sql = "SELECT p.id, p.title, p.author, u.date_uploaded " +
              "FROM poems p, uploaded_poems u WHERE p.id = u.poem_id" + where +
              " ORDER BY title;";

  db.query(sql, values)
    .then(poems => {
      res.locals.poems = poems;
      return next();
    })
    .catch(next);
};

let addPoem = (req, res, next) => {
  let sql1 = "SELECT id FROM poems WHERE title = $1 AND author = $2;",
      sql2 = "INSERT INTO poems (title, author, genre, body) VALUES ($1, $2, $3, $4) RETURNING id;",
      sql3 = "INSERT INTO uploaded_poems (poem_id, user_id, date_uploaded) VALUES ($1, $2, CURRENT_TIMESTAMP);";

  db.query(sql1, [req.body.title, req.body.author], true)
    .then(poem => {
      if (poem) {
        res.locals.poem = "Already exists";
        return next();
      }
      else {
        db.query(sql2, [req.body.title, req.body.author, req.body.genre, req.body.lines], true)
          .then(poem => {
            db.query(sql3, [poem.id, req.user.id]);
            res.locals.poem = poem;
            return next();
          })
          .catch(next);
      }
    })
    .catch(next);
};

let encodePoem = (req, res, next) => {
  let sql1 = "INSERT INTO encoded_poems (body) VALUES ($1) RETURNING id;",
      sql2 = "INSERT INTO full_encoding (poem_id, encoded_id, user_id, date_posted) VALUES ($1, $2, $3, CURRENT_TIMESTAMP);";

  db.query(sql1, [req.body.encodedPoem], true)
    .then(encoding => {
      db.query(sql2, [req.params.id, encoding.id, req.user.id]);
      return next();
    })
    .catch(next);
};

let getPoem = (req, res, next) => {
  let sql1 = "SELECT p.id, p.title, p.author, p.genre, p.body, u.date_uploaded FROM poems p, uploaded_poems u WHERE p.id = $1 AND p.id = u.poem_id;";

  db.query(sql1, [req.params.id], true)
    .then(poem => {
      res.locals.poem = poem;
      return next();
    })
    .catch(next);
};

let getPoemsByUser = (req, res, next) => {
  let sql1 = "SELECT p.id, p.title FROM poems p, uploaded_poems u WHERE u.poem_id = p.id AND u.user_id = $1 ORDER BY u.date_uploaded;";

  db.query(sql1, [req.user.id])
    .then(poems => {
      res.locals.poems = poems;
      return next();
    })
    .catch(next);
};

let getEncodingsByUser = (req, res, next) => {
  let sql1 = "SELECT f.encoded_id, f.poem_id, p.title, f.date_posted FROM full_encoding f, poems p " + 
              "WHERE f.poem_id = p.id AND f.user_id = $1 ORDER BY f.date_posted;";

  db.query(sql1, [req.user.id])
    .then(encodings => {
      res.locals.encodings = encodings;
      return next();
    })
    .catch(next);
};

exports.profileInfo = profileInfo;
exports.searchPoems = searchPoems;
exports.addPoem = addPoem;
exports.encodePoem = encodePoem;
exports.getPoem = getPoem;
exports.getPoemsByUser = getPoemsByUser;
exports.getEncodingsByUser = getEncodingsByUser;
