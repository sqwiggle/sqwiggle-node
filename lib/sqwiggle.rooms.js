module.exports = Rooms

function Rooms(that) {
  this.that = that;
}

Rooms.prototype = {

  index: function(callback) {
    return this.that.get.call(this.that, '/rooms', null, callback);
  },

  find: function(id, callback) {
    return this.that.get.call(this.that, '/rooms/'+id, null, callback);
  },

  create: function(data, callback) {
    return this.that.post.call(this.that, '/rooms', data, callback)
  },

  update: function(id, data, callback) {
    return this.that.put.call(this.that, '/rooms/'+id, data, callback)
  },

  remove: function(id, callback) {
    return this.that.delete.call(this.that, '/rooms/'+id, null, callback)
  }

}
