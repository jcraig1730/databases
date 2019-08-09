var Parse = {

  server: `localhost:3000/classes`,

  create: function(message, successCB, errorCB = null) {
    axios.post('/classes/messages', message)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  },


    // $.ajax({
    //   url: '/classes/messages',
    //   type: 'POST',
    //   data: JSON.stringify(message),
    //   contentType: 'application/json',
    //   success: () => {},
    //   error: errorCB || function (error) {
    //     console.error('chatterbox: Failed to create message', error);
    //   }
    // });
    //   },

  readAll: function(successCB, errorCB = null) {
    axios.get('/classes/messages')
      .then((data) => {
        Rooms.update(data.data, RoomsView.render);
        Messages.update(data.data, MessagesView.render);
        App.stopSpinner();
      })
      .catch(err => console.log(err));
    // $.ajax({
    //   url: `/classes/messages/`,
    //   type: 'GET',
    //   // data: { order: '-createdAt' },
    //   contentType: 'application/json',
    //   success: successCB,
    //   error: errorCB || function(error) {
    //     console.error('chatterbox: Failed to fetch messages', error);
    //   }
    // });
  }
};