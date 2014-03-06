module.exports = Organizations

function Organizations(that) {
  this.that = that;
}

Organizations.prototype = {

  index: function(callback) {
    return this.that.get.call(this.that, '/organizations', null, callback);
  },

  find: function(id, callback) {
    return this.that.get.call(this.that, '/organizations/'+id, null, callback);
  },

  update: function(id, data, callback) {
    return this.that.put.call(this.that, '/organizations/'+id, data, callback)
  },

}
