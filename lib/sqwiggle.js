var qs = require('querystring')
var request = require('request')

module.exports = Sqwiggle;

// Import the other modules
var Rooms = require('./sqwiggle.rooms');


// Initialize the Sqwiggle object
function Sqwiggle(token) {
  this.auth = {
    "username": token,
    "password": 'randomPass'
  },
  this.rooms = new Rooms(this);
}


// Some defaults for the Sqwiggle object
Sqwiggle.prototype = {
  api_base: 'https://api.sqwiggle.com',
  api_port: 443,
  get: function(endpoint, data, callback) {
    if(data) {
      var uri = this.api_base+endpoint+"?"+qs.stringify(data)
    } else {
      var uri = this.api_base+endpoint
    }

    request({
      "uri": uri,
      "auth": this.auth
    }, function(err, resp, body) {
      if(resp.statusCode == '200') {
        callback(null, JSON.parse(body));
      } else {
        callback(JSON.parse(body), null);
      }
    })
  },

  post: function(endpoint, data, callback) {
    uri = this.api_base + endpoint;
    request({
      method: "POST",
      uri: uri, 
      auth: this.auth,
      form: data
    }, function(err, resp, body) {
      if(resp.statusCode >= 200 && resp.statusCode < 300) {
        callback(null, JSON.parse(body));
      } else {
        callback(JSON.parse(body), null);
      }
    })
  },

  put: function(endpoint, data, callback) {
    uri = this.api_base + endpoint;
    request({
      method: "PUT",
      uri: uri, 
      auth: this.auth,
      form: data
    }, function(err, resp, body) {
      if(resp.statusCode >= 200 && resp.statusCode < 300) {
        callback(null, JSON.parse(body));
      } else {
        callback(JSON.parse(body), null);
      }
    })
  }


}
