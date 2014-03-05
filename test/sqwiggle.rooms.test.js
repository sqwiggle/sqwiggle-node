var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('cli_81fea39928d4d83558bff12ec80ed7fb')

describe('Rooms', function(){
  var scope = nock('https://api.sqwiggle.com')

  describe('Sqwiggle.rooms.index', function() {
    scope.get('/rooms')
      .reply(200, [{"id":1,"user_id":1,"name":"Sqwiggle","created_at":"2013-07-06T20:26:59Z","path":"","user_count":3},
        {"id":2,"user_id":2,"name":"Github","created_at":"2013-12-19T12:44:40Z","path":"github","user_count":0}
      ]);

    it ('loads the list of rooms', function(done) {
      client.rooms.index(function(err, response) {
        // nock.restore()
        // console.log(response)
        response.length.should.equal(2)
        response[0].name.should.equal("Sqwiggle")
        done();
      })
    });

  });


  describe('Sqwiggle.rooms.find', function(){
    scope.get('/rooms/1')
      .reply(200, {"id":1,"user_id":10,"name":"Sqwiggle","created_at":"2013-07-06T20:26:59Z","path":""})

    it("Finds a single room", function(done) {
      client.rooms.find(1, function(err, resp) {
        resp.id.should.equal(1)
        done();
      })
    })
    
  });

  describe('Sqwiggle.rooms.create', function(){
    scope.post('/rooms').reply(201, { id: 7489,
        user_id: 7854,
        name: 'Test Room',
        created_at: '2014-03-05T22:25:09Z',
        path: 'testroom' })

    it("Creates a room", function(done) {
      client.rooms.create("Test Room", function(err, resp) {
        should.not.exist(err)
        resp.name.should.equal('Test Room')
        done();
      })
    })
  })

  describe('Sqwiggle.rooms.update', function() {
    scope.put('/rooms/7489').reply(200, { id: 7489,
        user_id: 7854,
        name: 'Renamed Test Room',
        created_at: '2014-03-05T22:25:09Z',
        path: 'renamedtestroom' })

    it("updates a room", function(done) {
      client.rooms.update(7489, "Renamed Test Room", function(err, resp) {
        should.not.exist(err)
        resp.name.should.equal("Renamed Test Room")
        done()
      })
    })
  })

  describe('Sqwiggle.rooms.remove', function() {
    scope.delete('/rooms/7492').reply(200, '')
    it("deletes a room", function(done) {
      client.rooms.remove(7492, function(err, resp) {
        should.not.exist(err)
        resp.should.equal('OK')
        done()
      })
    })
  })

});
