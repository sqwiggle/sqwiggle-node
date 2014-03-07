module.exports = Rooms

function Rooms(api) {
  this.api = api;
}

Rooms.prototype = {

  index: function(callback) {
    return this.api.get('/rooms', null, callback);
  },

  find: function(id, callback) {
    return this.api.get('/rooms/'+id, null, callback);
  },

  create: function(data, callback) {
    return this.api.post('/rooms', data, callback)
  },

  update: function(id, data, callback) {
    return this.api.put('/rooms/'+id, data, callback)
  },

  delete: function(id, callback) {
    return this.api.delete('/rooms/'+id, null, callback)
  }

}
