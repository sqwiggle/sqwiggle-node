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

  create: function(name, callback) {
    return this.that.post.call(this.that, '/rooms', {"name": name}, callback)
  },

  update: function(id, name, callback) {
    return this.that.put.call(this.that, '/rooms/'+id, {"name": name}, callback)
  }

}
