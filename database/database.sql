CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username TEXT,
  password TEXT,
  salt TEXT,
  valid BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE profile (
  id INTEGER REFERENCES users (id),
  first_name TEXT,
  last_name TEXT,
  email TEXT
);

CREATE TABLE poems (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT,
  author TEXT,
  genre TEXT,
  body TEXT
);

CREATE TABLE uploaded_poems (
  poem_id INTEGER REFERENCES poems (id),
  user_id INTEGER REFERENCES users (id),
  date_uploaded TIMESTAMP WITHOUT TIME ZONE
);

CREATE TABLE encoded_poems (
  id SERIAL PRIMARY KEY NOT NULL,
  body TEXT
);

CREATE TABLE full_encoding (
  poem_id INTEGER REFERENCES poems (id),
  encoded_id INTEGER REFERENCES encoded_poems (id),
  user_id INTEGER REFERENCES users (id),
  date_posted TIMESTAMP WITHOUT TIME ZONE
);

INSERT INTO users (username, password, salt) VALUES
 ('User1','0d69f9f9f5f8281916dfb28f83b7621437a1618ee881e745cfcfb844f7f0634e','f574566127fc27d61d4c4777ac09ac9ec513ee843eb5c21fee42887b7b0542b9')
,('User2','02a3efdafbb99e165f647a734dc67e64764cded725225897c1ab23aa0a0f6c35','a47da52d82102a4d5db9a38cd834cc7705f63dea40d971e48378915b5a5a4fe8');

INSERT INTO profile (id, first_name, last_name, email) VALUES
 (1, 'User', 'One', 'Test.User1@gmail.com')
,(2, 'User', 'Two', 'Test.User2@gmail.com');
