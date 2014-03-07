module.exports = Users

function Users(api) {
  this.api = api;
}

Users.prototype = {

  index: function(callback) {
    return this.api.get('/users', null, callback);
  },

  find: function(id, callback) {
    return this.api.get('/users/'+id, null, callback);
  },

  update: function(id, data, callback) {
    return this.api.put('/users/'+id, data, callback)
  },

  delete: function(id, callback) {
    return this.api.delete('/users/'+id, null, callback)
  }

}
