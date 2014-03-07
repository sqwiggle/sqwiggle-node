module.exports = Messages

function Messages(api) {
  this.api = api;
}

Messages.prototype = {

  index: function(callback) {
    return this.api.get('/messages', null, callback);
  },

  find: function(id, callback) {
    return this.api.get('/messages/'+id, null, callback);
  },

  create: function(data, callback) {
    return this.api.post('/messages', data, callback)
  },

  update: function(id, data, callback) {
    return this.api.put('/messages/'+id, data, callback)
  },

  delete: function(id, callback) {
    return this.api.delete('/messages/'+id, null, callback)
  }

}
