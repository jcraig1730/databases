var db = require('../db');
//db is the connection object

module.exports = {
  messages: {
    get: function (callback) {
      db.query('select messages.id, messages.text, messages.roomname, users.username from messages INNER JOIN users where messages.username = users.id', (err, data) => {
        if (data.length < 1) {
          callback(null, [{username: 'test', roomname: 'lobby', text: 'this is a test post'}]);
        } else {
          callback(null, data);
        }
      });
    }, // a function which produces all the messages
    post: (message) => {
      //INSERT INTO messages
      //if user is already in database
        //do all that
      //else
        //add user first
      db.query(`SELECT id FROM users WHERE username = ?`, [message.username], (err, data) => {
        if (!data.length > 0) {
          //put user into database
          db.query('INSERT INTO users SET ?', {username: message.username}, (err) => {
            if (err) {
              throw err;
            } else {
              db.query(`SELECT id FROM users WHERE username = ?`, [message.username], (err, id) => {
                if (err) {
                  throw err;
                } else {
                  db.query(`INSERT INTO messages SET ?`, {username: id, text: message.text, roomname: message.roomname}, (err) => {
                    if (err) {
                      throw err;
                    }
                  });
                }
              });
            }
          });
        } else {
          db.query('INSERT INTO messages (username, text, roomname) VALUES (?, ?, ?)', [data[0].id, message.text, message.roomname], (err) => {
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

