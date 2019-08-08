var db = require('../db');

//db is the connection object

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages', (err, data) => {
        if (err){
          throw err;
        } else {
          callback(null, data);
        }
      })
    }, // a function which produces all the messages
    post: (message) => {
      //INSERT INTO messages
      db.query(`SELECT id FROM users WHERE username = ${message.username}`, (err, data) => {
        console.log(data)
        db.query('INSERT INTO messages SET ?', {username: data, text: message.message, roomname: message.roomname}, (err, data) => {
          if (err) {
            throw err;
          } else {

          }
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.query('SELECT username FROM users', (err, data) => {
        if (err){
          throw err;
        } else {
          callback(null, data);
        }
      });
    },
    post: function (newUser) {
      //use db.query somewhere in here
      db.query('INSERT INTO users SET ?', {username: newUser.username}, (err, data) => {
        if (err) {
          throw err;
        } else {
          // console.log(data)
        }
      })
    }
  }
};

