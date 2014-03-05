var should = require('should');
var Sqwiggle = require('../index');
var client = new Sqwiggle('cli_81fea39928d4d83558bff12ec80ed7fb')

describe('Sqwiggle.rooms', function(){
  it ('loads the list of rooms', function(done) {
    client.rooms.list(function(err, response) {
      console.log(err)
      console.log(response)
      done();
    })
  })
})
