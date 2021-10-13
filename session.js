let sessionStore =  {}; // Store's session by TOKEN as main key
let IdStore = {}; // Store's tokens and sokects by ID as main key

module.exports = {
  createSession: function(token, id) { // Create's new session
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
    if(IdStore[id]) {
      IdStore[id].token.push(token);
    }else {
      IdStore[id] = {
        token: [token]
      }
    }
  },
  checkSession: function(token) {
    if(sessionStore[token]) {
      return 1;
    }else {
      return 0;
    }
  },
  getId: function(token) {
    return sessionStore[token].id;
  }
}