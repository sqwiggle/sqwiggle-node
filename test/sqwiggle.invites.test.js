var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('test_api_key')

var sample_invite = { id: 1234,
  from_id: 4321,
  email: 'sqwiggletest@example.com',
  avatar: 'https://www.gravatar.com/avatar/2fcf49e959a87535c2b5227d02?d=mm',
  url: 'https://www.sqwiggle.com/signup/9fabd3f60ec8cc36994dba62',
  created_at: '2014-03-06T21:53:41Z' }


describe('Sqwiggle.invites', function(){
  var scope = nock('https://api.sqwiggle.com')

  describe('.index', function() {
    scope.get('/invites').reply(200, [sample_invite])
    it('loads the list of invitations', function(done){
      client.invites.index(function(err, resp) {
        resp[0].id.should.equal(1234);
        done()
      })
    })
  })

  describe('.find', function() {
    scope.get('/invites/1234').reply(200, sample_invite)
    it('finds a single invitation', function(done){
      client.invites.find(1234, function(err, resp) {
        resp.id.should.equal(1234)
        done()
      })
    })
  })

  describe('.create', function() {
    scope.post('/invites').reply(201, sample_invite)
    it('creates an invitation', function(done){
      client.invites.create({email: 'test@example.com'}, function(err, resp) {
        resp.id.should.equal(1234)
        done()
      })
    })
  })

  describe('.delete', function() {
    scope.delete('/invites/1234').reply(200, '')
    it('deletes an invitation', function(done){
      client.invites.delete(1234, function(err, resp) {
        resp.should.equal('OK')
        done()
      })
    })
  })

})

