module.exports = {
  sessionStore: {}, // Store's session by TOKEN as main key
  IdStore: {}, // Store's tokens and sokects by ID as main key
  createSession: function(token, id) { // Create's new session
    /* Creates new entry in sessionStore 
    with id of user and token as main key 
    with expire time */
    this.sessionStore[token] = {
      id: id,
      expire: 9999999999
    }
    
    /* If we already have a user main token 
    key than it must have at last one token 
    in id store so push it */
    if(this.IdStore[id]) {
      this.IdStore[id].token.push(token);
    }else {
      this.IdStore[id] = {
        token: [token]
      }
    }
  }
}