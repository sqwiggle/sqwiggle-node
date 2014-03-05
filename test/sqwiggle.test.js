var should = require('should');

describe("Sqwiggle", function(){
  it("exports a Sqwiggle that can be initialized", function(){
    var Sqwiggle = require('../index');
    var client = new Sqwiggle('token');
    client.should.have.property('token');
  })
})
