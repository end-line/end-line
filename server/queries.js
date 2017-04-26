"use strict";

let crypto = require('crypto'),
    db = require('./pghelper'),
    randomstring = require("randomstring");

let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

let createSalt = () => crypto.randomBytes(32).toString('hex'); //creates salt for password

let createHash = (string) => crypto.createHash('sha256').update(string).digest('hex'); //hashes password

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
      pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 12,
      page = req.query.page ? parseInt(req.query.page) : 1,
      whereParts = [],
      values = [];

  if (search) {
    values.push(escape(search));
    whereParts.push("title || author ~* $" + values.length);
  }

  let where = whereParts.length > 0 ? (" AND " + whereParts.join(" AND ")) : "";

  let countSql = "SELECT COUNT(*) from poems p, uploaded_poems u WHERE p.id = u.poem_id" + where + ";";

  let sql = "SELECT p.id, p.title, p.author, u.date_uploaded " +
              "FROM poems p, uploaded_poems u WHERE p.id = u.poem_id" + where +
              " ORDER BY title LIMIT $" + (values.length + 1) + " OFFSET $" + (values.length + 2) + ";";

  db.query(countSql, values, true)
    .then(result => {
      let total = parseInt(result.count);
      db.query(sql, values.concat([pageSize, ((page - 1) * pageSize)]))
        .then(poems => {
          res.locals.poems = {"pageSize": pageSize, "page": page, "total": total, "poems": poems};
          return next();
        })
        .catch(next);
    })
    .catch(next);
};

let addPoem = (req, res, next) => {
  let sql1 = "SELECT id, title, author FROM poems WHERE LOWER(title) = $1 AND LOWER(author) = $2;",
      sql2 = "INSERT INTO poems (title, author, genre, body) VALUES ($1, $2, $3, $4) RETURNING id;",
      sql3 = "INSERT INTO uploaded_poems (poem_id, user_id, date_uploaded) VALUES ($1, $2, CURRENT_TIMESTAMP AT TIME ZONE 'UTC');";

  db.query(sql1, [req.body.title.toLowerCase(), req.body.author.toLowerCase()], true)
    .then(poem => {
      if (poem) {
        req.flash('poem_check', poem);
        req.flash('title', req.body.title);
        req.flash('author', req.body.author);
        req.flash('genre', req.body.genre);
        req.flash('lines', req.body.lines);
        return res.redirect("/upload");
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
      sql2 = "INSERT INTO full_encoding (poem_id, encoded_id, user_id, date_posted) VALUES ($1, $2, $3, CURRENT_TIMESTAMP AT TIME ZONE 'UTC');";

  db.query(sql1, [req.body.encodedPoem], true)
    .then(encoding => {
      db.query(sql2, [req.params.id, encoding.id, req.user.id]);
      return next();
    })
    .catch(next);
};

let getPoem = (req, res, next) => {
  let sql1 = "SELECT p.id, p.title, p.author, p.genre, p.body, u.date_uploaded " + 
              "FROM poems p, uploaded_poems u WHERE p.id = $1 AND p.id = u.poem_id;";

  db.query(sql1, [req.params.id], true)
    .then(poem => {
      res.locals.poem = poem;
      return next();
    })
    .catch(next);
};

let getEncoding = (req, res, next) => {
  let sql1 = "SELECT f.poem_id, f.encoded_id, p.title, p.author, e.body, f.date_posted " + 
              "FROM poems p, encoded_poems e, full_encoding f WHERE p.id = $1 AND e.id = $2 AND p.id = f.poem_id AND e.id = f.encoded_id;";

  db.query(sql1, [req.params.poem_id, req.params.encoded_id], true)
    .then(poemcoding => {
      res.locals.poemcoding = poemcoding;
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

let getEncodingsByPoem = (req, res, next) => {
  let sql1 = "SELECT f.encoded_id, f.poem_id, p.title, f.date_posted, pr.first_name, pr.last_name " + 
              "FROM full_encoding f, poems p, profile pr " + 
              "WHERE f.poem_id = p.id AND f.user_id = pr.id AND f.poem_id = $1 ORDER BY f.date_posted;";

  db.query(sql1, [req.params.id])
    .then(encodings => {
      res.locals.encodings = encodings;
      return next();
    })
    .catch(next);
};

let getEncodingsForCompare = (req, res, next) => {
  let sql = "SELECT t1.id AS id_1, t1.body AS body_1, t2.id AS id_2, t2.body AS body_2 FROM ";
  let sqlEncode = "(SELECT id, body FROM encoded_poems WHERE id = $";
  let sqlPoem = "(SELECT id, body FROM poems WHERE id = $";

  if(req.params.type_1 === 'poem') sql += sqlPoem + "1) AS t1, ";
  else sql += sqlEncode + "1) AS t1, ";
  if(req.params.type_2 === 'poem') sql += sqlPoem + "2) AS t2;";
  else sql += sqlEncode + "2) AS t2;";

  db.query(sql, [req.params.version_1, req.params.version_2], true)
    .then(encodings => {
      res.locals.encodings = encodings;
      return next();
    })
    .catch(next);
};

let validateAccount = (req, res, next) => {
  let sql = "UPDATE users SET valid = TRUE WHERE id = $1 AND secret = $2 RETURNING id;";

  db.query(sql, [req.params.user_id, req.params.user_secret], true)
    .then((user) => {
      if(user) {
        return next();
      }
      else {
        res.redirect('/');
      }
    })
    .catch(next);
};

let changePassword = (req, res, next) => { //changes password for a user

  let salt = createSalt(); //creates salt
  let hashedPassword = createHash(req.body.password + salt); //creates a hashed password with the inputted password and salt

  let sql1 = "SELECT salt FROM users WHERE id = $1;";
  let sql2 = "SELECT id FROM users WHERE password = $1 AND id = $2;";
  let sql3 = "UPDATE users SET password = $1, salt = $2 WHERE id = $3";

  if(req.body.passwordOld !== req.body.passwordOldConfirm) {
    req.flash('message', 'Passwords do not match');
    return next();
  }
  else {
    db.query(sql1, [req.user.id], true)
      .then(user => {
        let hashedPasswordOld = createHash(req.body.passwordOld + user.salt);
        db.query(sql2, [hashedPasswordOld, req.user.id], true)
          .then(result => {
            if(result) {
              db.query(sql3, [hashedPassword, salt, req.user.id])
                .then(() => {
                  req.flash('message', 'Password change successful');
                  return next();
                })
                .catch(next);
            }
            else {
              req.flash('message', 'Not current password');
              return next();
            }
          })
          .catch(next);
      })
      .catch(next);
  }
};

let resetPassword = (req, res, next) => { //changes password for a user

  let newPassword = randomstring.generate(7); //creates random password string
  let salt = createSalt(); //creates salt
  let hashedPassword = createHash(newPassword + salt); //creates a hashed password with the new password and salt

  let sql1 = "SELECT u.id FROM users u, profile p WHERE u.id = p.id AND u.username = $1 AND p.email = $2;";
  let sql2 = "UPDATE users SET password = $1, salt = $2 WHERE id = $3";

  db.query(sql1, [req.body.username, req.body.email], true)
    .then(user => {
      if(user) {
        db.query(sql2, [hashedPassword, salt, user.id])
          .then(() => {
            req.flash('message', 'Password reset');
            res.locals.password = newPassword;
            return next();
          })
          .catch(next);
      }
      else {
        req.flash('message', 'Username and email do not match records');
        return next();
      }
    })
    .catch(next);
};

exports.profileInfo = profileInfo;
exports.searchPoems = searchPoems;
exports.addPoem = addPoem;
exports.encodePoem = encodePoem;
exports.getPoem = getPoem;
exports.getEncoding = getEncoding;
exports.getPoemsByUser = getPoemsByUser;
exports.getEncodingsByUser = getEncodingsByUser;
exports.getEncodingsByPoem = getEncodingsByPoem;
exports.getEncodingsForCompare = getEncodingsForCompare;
exports.validateAccount = validateAccount;
exports.changePassword = changePassword;
exports.resetPassword = resetPassword;
