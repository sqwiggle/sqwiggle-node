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


// Initialize the Sqwiggle object
function Sqwiggle(token) {
  this.auth = {
    "username": token,
    "password": 'randomPass'
  }

  this.attachments = new Attachments(this);
  this.conversations = new Conversations(this);
  this.info = new Info(this);
  this.invites = new Invites(this);
  this.messages = new Messages(this);
  this.rooms = new Rooms(this);
  this.organizations = new Organizations(this);
  this.users = new Users(this);
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
