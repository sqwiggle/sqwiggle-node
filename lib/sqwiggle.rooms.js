module.exports = Rooms

function Rooms(that) {
  this.that = that;

  this.index = function(callback) {
    return that.sqwiggleRequest.call(that, 'GET', '/rooms', null, callback, 'json');
  }
}
