module.exports = Sqwiggle;

function Sqwiggle(token) {
  this.token = token;
}

Sqwiggle.prototype = {
  _api_protocol: require('https'),
  _api_host: 'api.sqwiggle.com',
  _api_port: 443,

  rooms: {
    list: function(callback) {
      return sqwiggleRequest.call('GET', '/rooms', null, callback, 'json');
    }
  }

}

function sqwiggleRequest(method, path, data, callback, contentType) {

  var auth = "Basic " + new Buffer(this.token + ':' + 'randompass').toString('base64');
  var headers = {
    'Authorization': auth
  };

  var options = {
    host: this._api_host,
    port: this._api_port,
    headers: headers,
    path: path,
    method: method
  }

  var req = this._api_protocol.request(options, function(res) {
    
  })

}
