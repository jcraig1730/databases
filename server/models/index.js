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
      //if user is already in database
        //do all that
      //else
        //add user first
      db.query(`SELECT id FROM users WHERE username = 'Valjean'`, (err, data) => {
        console.log('is there an error', err);
        if (err) {
          //put user into database
          db.query('INSERT INTO users SET ?', {username: message.username}, (err) => {
            if (err) {
              throw err;
            } else {
              db.query(`SELECT id FROM users WHERE username = ${message.username}`, (err, id) => {
                if (err) {
                  throw err;
                } else {
                  db.query(`INSERT INTO messages SET ?`, {username: id, text: message.message, roomname: message.roomname}, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              });
            }
          });
        } else {
          console.log('a', data)
          db.query('INSERT INTO messages SET ?', {username: data[0].id, text: message.message, roomname: message.roomname}, (err) => {
            if (err) {
              throw err;
            }
          });
        };
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

