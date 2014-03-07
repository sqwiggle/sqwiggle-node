var qs = require('querystring')
var request = require('request')

module.exports = Sqwiggle;

// Import the other modules
var Attachments = require('./sqwiggle.attachments');
var Conversations = require('./sqwiggle.conversations');
var Info = require('./sqwiggle.info');
var Invites = require('./sqwiggle.invites');
var Messages = require('./sqwiggle.messages');
var Organizations = require('./sqwiggle.organizations');
var Rooms = require('./sqwiggle.rooms');
var Users = require('./sqwiggle.users');
var ServiceObject = require('./sqwiggle.service_object');


// Initialize the Sqwiggle object
function Sqwiggle(token) {
  this.auth = {
    "username": token,
    "password": 'randomPass'
  }

  this.attachments = new ServiceObject(this, {
    endpoints: ["index", "find", "update", "delete"],
    basePath: '/attachments'
  });

  this.conversations = new ServiceObject(this, {
    endpoints: ["index", "find"],
    basePath: '/conversations'
  });

  this.info = new Info(this);

  this.invites = new ServiceObject(this, {
    endpoints: ["index", "find", "create", "delete"],
    basePath: '/invites'
  });

  this.messages = new ServiceObject(this, {
    endpoints: ["index", "find", "create", "update", "delete"],
    basePath: '/messages'
  });

  this.rooms = new ServiceObject(this, {
    endpoints: ["index", "find", "create", "update", "delete"], 
    basePath: '/rooms'
  })

  this.organizations = new ServiceObject(this, {
    endpoints: ["index", "find", "update", "delete"], 
    basePath: '/organizations'
  });

  this.users = new ServiceObject(this, {
    endpoints: ['index', 'find', 'update'],
    basePath: '/users'
  });
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
  },

  delete: function(endpoint, data, callback) {
    uri = this.api_base + endpoint;
    request({
      method: "DELETE",
      uri: uri, 
      auth: this.auth
    }, function(err, resp, body) {
      console.log(body)
      if(resp.statusCode >= 200 && resp.statusCode < 300) {
        callback(null, 'OK');
      } else {
        callback(JSON.parse(body), null);
      }
    })
  }

}
