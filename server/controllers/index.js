var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get((err, data) => {
        if (err) {
          throw err;
        } else {
          res.set({
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
            "access-control-allow-headers": "content-type, accept",
            "access-control-max-age": 10
          });
          res.send(data);
        }
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log(req.body);
      models.messages.post(req.body);
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err, data) => {
        if (err) {
          throw err;
        } else {
          res.set({
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
            "access-control-allow-headers": "content-type, accept",
            "access-control-max-age": 10
          });
          res.send(data);
        }
      });
    },
    post: function (req, res) {
      //add username to database using models
      models.users.post(req.body);
      res.end();
    }
  }
};

