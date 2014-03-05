module.exports = Sqwiggle;

function Sqwiggle(token) {
  this.token = token;
  this.rooms = new Rooms(this);
}

function Rooms(that) {
  this.that = that;

  this.list = function(callback) {
    return sqwiggleRequest.call(that, 'GET', '/rooms', null, callback, 'json');
  }
}

Sqwiggle.prototype = {

  rooms: function(callback) {
  }

}

function sqwiggleRequest(method, path, data, callback, contentType) {
  var api_protocol = require('https');
  var api_host = 'api.sqwiggle.com';
  var api_port = 443;

  var auth = "Basic " + new Buffer(this.token + ':' + 'randompass').toString('base64');

  var headers = {
    'Authorization': auth
  };

  var options = {
    hostname: api_host,
    port: api_port,
    path: path,
    headers: headers,
    method: method
  }

  var req = api_protocol.request(options, function (res) {
    var buffer = '';
    res.on('data', function(chunk){
      return buffer += chunk;
    });
    res.on('end', function() {
      var value;
      if (callback != null) {
        if (res.statusCode === 200) {
          value = options.json === false ? buffer : JSON.parse(buffer);
          return callback(null, value)
        } else {
          return callback(buffer, null)
        }
      }
    });
  }).end()
}

