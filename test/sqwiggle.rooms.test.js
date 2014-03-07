var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('test_api_key');

var sample_room = {"id":1,"user_id":1,"name":"Sqwiggle","created_at":"2013-07-06T20:26:59Z","path":"","user_count":3};

describe('Rooms', function(){
  var scope = nock('https://api.sqwiggle.com')

  describe('Sqwiggle.rooms.index', function() {
    scope.get('/rooms')
      .reply(200, [sample_room]);

    it('loads the list of rooms', function(done) {
      client.rooms.index(null, function(err, response) {
        // nock.restore()
        // console.log(response)
        response.length.should.equal(1)
        response[0].name.should.equal("Sqwiggle")
        done();
      })
    });

    scope.get('/rooms?page=2&limit=1').reply(200, [sample_room])

    it('accepts page and limit', function(done) {
      client.rooms.index({page: 2, limit: 1}, function(err, resp) {
        resp.length.should.equal(1)
        resp[0].name.should.equal('Sqwiggle')
        done()
      })
    })

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
      client.rooms.create({"name": "Test Room"}, function(err, resp) {
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
      client.rooms.update(7489, {"name": "Renamed Test Room"}, function(err, resp) {
        should.not.exist(err)
        resp.name.should.equal("Renamed Test Room")
        done()
      })
    })
  })

  describe('Sqwiggle.rooms.remove', function() {
    scope.delete('/rooms/7492').reply(200, '')
    it("deletes a room", function(done) {
      client.rooms.delete(7492, function(err, resp) {
        should.not.exist(err)
        resp.should.equal('OK')
        done()
      })
    })
  })

});
