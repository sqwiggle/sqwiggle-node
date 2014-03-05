var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('test_api_key')

describe('Rooms', function(){

  describe('Sqwiggle.rooms.index', function() {
    var scope = nock('https://api.sqwiggle.com')
                    .get('/rooms')
                    .reply(200, [{"id":1,"user_id":1,"name":"Sqwiggle","created_at":"2013-07-06T20:26:59Z","path":"","user_count":3},
                      {"id":2,"user_id":2,"name":"Github","created_at":"2013-12-19T12:44:40Z","path":"github","user_count":0}
                    ]);

    it ('loads the list of rooms', function(done) {
      client.rooms.index(function(err, response) {
        should.not.exist(err)
        should.exist(response)
        response.length.should.equal(2)
        response[0].name.should.equal("Sqwiggle")
        done();
      })
    })

  })

});
