module.exports = Attachments

function Attachments(that) {
  this.that = that;
}

Attachments.prototype = {

  index: function(callback) {
    return this.that.get.call(this.that, '/attachments', null, callback);
  },

  find: function(id, callback) {
    return this.that.get.call(this.that, '/attachments/'+id, null, callback);
  },

  update: function(id, data, callback) {
    return this.that.put.call(this.that, '/attachments/'+id, data, callback)
  },

  delete: function(id, callback) {
    return this.that.delete.call(this.that, '/attachments/'+id, null, callback)
  }

}
