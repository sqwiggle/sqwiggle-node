module.exports = Conversations

function Conversations(that) {
  this.that = that;
}

Conversations.prototype = {

  index: function(callback) {
    return this.that.get.call(this.that, '/conversations', null, callback);
  },

  find: function(id, callback) {
    return this.that.get.call(this.that, '/conversations/'+id, null, callback);
  }

}
