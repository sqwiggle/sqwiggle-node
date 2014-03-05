module.exports = Rooms

function Rooms(that) {
  this.that = that;
}

Rooms.prototype = {

  index: function(callback) {
    return this.that.sqwiggleRequest.call(this.that, 'GET', '/rooms', null, callback, 'json');
  },

  find: function(id, callback) {
    return this.that.sqwiggleRequest.call(this.that, 'GET', '/rooms/'+id, null, callback, 'json');
  }

}
