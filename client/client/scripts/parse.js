var Parse = {

  server: `localhost:3000/classes`,

  create: function(message, successCB, errorCB = null) {
    $.ajax({
      url: '/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: () => {},
      error: errorCB || function (error) {
        console.error('chatterbox: Failed to create message', error);
      }
    });
      },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: `/classes/messages/`,
      type: 'GET',
      // data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};