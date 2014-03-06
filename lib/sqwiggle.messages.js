module.exports = Messages

function Messages(that) {
  this.that = that;
}

Messages.prototype = {

  index: function(callback) {
    return this.that.get.call(this.that, '/messages', null, callback);
  },

  find: function(id, callback) {
    return this.that.get.call(this.that, '/messages/'+id, null, callback);
  },

  create: function(data, callback) {
    return this.that.post.call(this.that, '/messages', data, callback)
  },

  update: function(id, data, callback) {
    return this.that.put.call(this.that, '/messages/'+id, data, callback)
  },

  delete: function(id, callback) {
    return this.that.delete.call(this.that, '/messages/'+id, null, callback)
  }

}
