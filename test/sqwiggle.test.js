var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('token');

describe("Sqwiggle", function(){
  it("exports a Sqwiggle that can be initialized", function(){
    client.should.have.property('token');
  });

  describe("sqwiggleRequest", function() {
    var scope = nock('https://api.sqwiggle.com');

    describe("success values", function() {
      scope.get('/foo').reply(200, {'Happy': 'Days'});


      it("Sends back a response when the status code is 200", function(done){
        var callback = function (err, resp) {
          should.exist(resp);
          should.not.exist(err);
          done();
        }
        client.sqwiggleRequest('GET', '/foo', null, callback);
      })

    });

    describe("error values", function() {
      scope.get('/foo').reply(404, {"error": "Page not found."})
      it("sends back an error when the status code is 404", function(done) {
        var callback = function (err, resp) {
          should.exist(err);
          should.not.exist(resp);
          done();
        }
        client.sqwiggleRequest('GET', '/foo', null, callback);
      });
    })

  });

})
