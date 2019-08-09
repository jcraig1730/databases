/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'student', 'student', {host: 'localhost', dialect: 'mysql', define: {timestamps: false}});
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */
db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING
});

var Message = db.define('message', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,
  username: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

Message.sync({force: false})
  .then(() => {
    return User.findAll({where: {username: 'h&j'}});
  })
  .then(result => {
    return (result[0].dataValues.id);
  })
  .then((id) => {
    return Message.create({
      text: 'h&j from orm',
      roomname: 'sequalize room',
      username: id
    });
});

// .then(() => {
//   return Message.findAll({ where: {roomname: 'sequalize room'}});
// })
// .then(result => {
//   console.log(result[0].dataValues);
//   db.close();
// });

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
// User.sync()
//   .then(function() {
//     // Now instantiate an object and save it:
//     return User.create({username: 'Jean Valjean'});
//   })
//   .then(function() {
//     // Retrieve objects from the database:
//     return User.findAll({ where: {username: 'Jean Valjean'} });
//   })
//   .then(function(users) {
//     users.forEach(function(user) {
//       console.log(user.username + ' exists');
//     });
    // db.close();
//   })
//   .catch(function(err) {
//     // Handle any error in the chain
//     console.error(err);
//     db.close();
//   });
