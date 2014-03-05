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
    console.log(uri);
    // body = qs.stringify(data);
    // console.log(body)
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
  }


  // sqwiggleRequest: function (method, path, data, callback) {
  //   var auth = "Basic " + new Buffer(this.token + ':' + 'randompass').toString('base64');

  //   var headers = {
  //     'Authorization': auth
  //   };

  //   var options = {
  //     hostname: this.api_host,
  //     port: this.api_port,
  //     path: path,
  //     headers: headers,
  //     method: method
  //   }

  //   switch (method) {
  //     case "GET":
  //       if(data) {
  //         path += "?" + qs.stringify(data)
  //       }
  //       break;
  //     case "POST":
  //       body = typeof data === 'object' ? qs.stringify(data) : data;
  //       headers['Content-length'] = body.length;
  //       break;
  //   }

  //   var req = this.api_protocol.request(options, function (res) {
  //     var buffer = '';
  //     res.on('data', function(chunk){
  //       return buffer += chunk;
  //     });
  //     res.on('end', function() {
  //       var value;
  //       if (callback != null) {
  //         if (res.statusCode === 200) {
  //           value = options.json === false ? buffer : JSON.parse(buffer);
  //           return callback(null, value)
  //         } else {
  //           return callback(buffer, null)
  //         }
  //       }
  //     });
  //   })
  //   if(body) {
  //     console.log(body)
  //     req.write(body)
  //   }
  //   req.end()
  // }
}
