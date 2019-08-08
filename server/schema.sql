CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  id integer auto_increment primary key,
  username varchar(20)
);

CREATE TABLE messages (
  id integer auto_increment primary key,
  username int,
  text varchar(255),
  roomname varchar(20),
  FOREIGN KEY (username) REFERENCES users (id)
  -- FOREIGN KEY (roomname) REFERENCES rooms (id)
);

/* Create other tables and define schemas for them here! */

-- CREATE TABLE rooms (
--   id integer auto_increment primary key,
--   roomname varchar(20)
-- );

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

