var should = require('should');
var Sqwiggle = require('../index');
var client = new Sqwiggle('cli_81fea39928d4d83558bff12ec80ed7fb')

describe('Rooms', function(){
  describe('Sqwiggle.rooms.list') {
    it ('loads the list of rooms', function(done) {
      client.rooms.list(function(err, response) {
        should.not.exist(err)
        should.exist(response)
        response[0].name.should.equal("Sqwiggle")
        console.log('response: '+JSON.stringify(response))
        done();
      })
    })
  }
});
