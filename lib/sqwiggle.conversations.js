module.exports = Conversations

function Conversations(api) {
  this.api = api;
}

Conversations.prototype = {

  index: function(callback) {
    return this.api.get('/conversations', null, callback);
  },

  find: function(id, callback) {
    return this.api.get('/conversations/'+id, null, callback);
  }

}
