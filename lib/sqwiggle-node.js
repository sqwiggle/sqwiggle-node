module.exports = Sqwiggle;

// Import the other modules
var Rooms = require('./sqwiggle.rooms');


// Initialize the Sqwiggle object
function Sqwiggle(token) {
  this.token = token;
  this.rooms = new Rooms(this);
}


// Some defaults for the Sqwiggle object
Sqwiggle.prototype = {
  api_protocol: require('https'),
  api_host: 'api.sqwiggle.com',
  api_port: 443,

  sqwiggleRequest: function (method, path, data, callback, contentType) {
    var auth = "Basic " + new Buffer(this.token + ':' + 'randompass').toString('base64');

    var headers = {
      'Authorization': auth
    };

    var options = {
      hostname: this.api_host,
      port: this.api_port,
      path: path,
      headers: headers,
      method: method
    }

    var req = this.api_protocol.request(options, function (res) {
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
}
