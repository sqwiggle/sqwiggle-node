module.exports = Organizations

function Organizations(api) {
  this.api = api;
}

Organizations.prototype = {

  index: function(callback) {
    return this.api.get('/organizations', null, callback);
  },

  find: function(id, callback) {
    return this.api.get('/organizations/'+id, null, callback);
  },

  update: function(id, data, callback) {
    return this.api.put('/organizations/'+id, data, callback)
  },

}
