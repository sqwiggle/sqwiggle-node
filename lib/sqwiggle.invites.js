module.exports = Invites

function Invites(api) {
  this.api = api;
}

Invites.prototype = {

  index: function(callback) {
    return this.api.get('/invites', null, callback);
  },

  find: function(id, callback) {
    return this.api.get('/invites/'+id, null, callback);
  },

  create: function(data, callback) {
    return this.api.post('/invites', data, callback)
  },

  delete: function(id, callback) {
    return this.api.delete('/invites/'+id, null, callback)
  }

}
