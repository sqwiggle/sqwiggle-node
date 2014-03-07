var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('test_api_key')

var sample_user = { id: 1234,
  room_id: 4321,
  media: { audio: true, video: true, screen: false },
  role: 'owner',
  status: 'offline',
  confirmed: true,
  message: null,
  email: 'email@test.com',
  name: 'Test User',
  avatar: 'https://www.gravatar.com/avatar/26b21ae7b51c430e?d=mm&s=300',
  time_zone: 'Central Time (US & Canada)',
  time_zone_offset: -6,
  idle_at: null,
  last_active_at: '2014-03-06T22:03:53Z',
  last_connected_at: '2014-03-06T21:53:47Z',
  created_at: '2014-03-06T21:52:21Z' }

describe('Sqwiggle.users', function(){
  var scope = nock('https://api.sqwiggle.com')

  describe('.index', function(){
    scope.get('/users').reply(200, [sample_user])
    it('loads the list of users', function(done){
      client.users.index(function(err, resp) {
        resp[0].email.should.equal('email@test.com')
        done()
      })
    })
  })

  describe('.find', function(){
    scope.get('/users/1234').reply(200, sample_user)
    it('loads a specific user', function(done) {
      client.users.find(1234, function(err, resp) {
        resp.email.should.equal('email@test.com')
        done()
      })
    })
  })

  describe('.update', function(){
    scope.put('/users/1234').reply(200, sample_user)
    it('updates an existing user', function(done){
      client.users.update(1234,{email: 'testuser@test.com'}, function(err, resp) {
        resp.name.should.equal('Test User')
        done()
      })
    })
  })

})

