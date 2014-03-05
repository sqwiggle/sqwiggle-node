module.exports = Sqwiggle;

function Sqwiggle(token) {
  this.token = token;
}

Sqwiggle.prototype = {

}

function sqwiggleRequest(method, path, data, callback, contentType) {

  var api_base = "https://api.sqwiggle.com/";
  var auth = "Basic " + new Buffer(this.token + ':' + 'randompass').toString('base64');
  var headers = {
    'Authorization': auth
  }


}
