module.exports = Info

function Info(api) {
  this.api = api;
}

Info.prototype = {

  configuration: function(callback) {
    return this.api.get('/info/configuration', null, callback);
  },

  versions: function(callback) {
    return this.api.get('/info/versions', null, callback);
  },

  all: function(callback) {
    return this.api.get('/info', null, callback);
  },

}
