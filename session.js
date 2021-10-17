let sessionStore = {}; // Store's session by TOKEN as main key
let idStore = {}; // Store's tokens and sokects by ID as main key

module.exports = {
  createSession: function (token, id) { // Create's new session
    /* Creates new entry in sessionStore 
    with id of user and token as main key 
    with expire time */
    sessionStore[token] = {
      id: id,
      expire: 9999999999
    }

    /* If we already have a user main token 
    key than it must have at last one token 
    in id store so push it */
    if (idStore[id]) {
      idStore[id].token.push(token);
    } else {
      idStore[id] = {
        token: [token]
      }
    }
  },
  getUserSession: function (userID) {
    if(idStore[userID].socket) {
      return idStore[userID].socket;
    }else {
      return [];
    }
  },
  checkSession: function (token) {
    if (sessionStore[token]) {
      return 1;
    } else {
      return 0;
    }
  },
  getId: function (token) {
    return sessionStore[token].id;
  },
  appendSocket: function (socket, token) {
    if (!sessionStore[token].socket) {
      sessionStore[token].socket = [];
    }

    if(!idStore[this.getId(token)].socket) {
      idStore[this.getId(token)].socket = [];
    };

    idStore[this.getId(token)].socket.push(socket.id);

    sessionStore[token].socket.push(socket.id);
  },
  removeSocket: function (socket, token) {
    const index = sessionStore[token].socket.indexOf(socket.id);

    if(idStore[this.getId(token)].socket) {
      const index = idStore[this.getId(token)].socket.indexOf(socket.id);

      idStore[this.getId(token)].socket.splice(index, 1);
    };

    sessionStore[token].socket.splice(index, 1);
  }
}