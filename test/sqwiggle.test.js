var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('test_token');

describe("Sqwiggle", function(){
  it("exports a Sqwiggle that can be initialized", function(){
    client.auth.username.should.equal('test_token');
  });
})
