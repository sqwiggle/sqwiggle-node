module.exports = Info

function Info(that) {
  this.that = that;
}

Info.prototype = {

  configuration: function(callback) {
    return this.that.get.call(this.that, '/info/configuration', null, callback);
  },

  versions: function(callback) {
    return this.that.get.call(this.that, '/info/versions', null, callback);
  },

  all: function(callback) {
    return this.that.get.call(this.that, '/info', null, callback);
  },

}
