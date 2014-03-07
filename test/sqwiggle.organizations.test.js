var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('test_api_key')

var sample_org = { id: 123,
  name: 'Google',
  user_count: 14,
  billing: 
    { plan: 'fun-plan',
      receipts: false,
      status: 'paid',
      email: 'user@test.com',
      active_card: false },
  security: 
    { open_invites: true,
      media_accept: false,
      domain_restrict: false,
      domain_signup: true },
  created_at: '2013-04-04T01:34:04Z',
  path: 'google' }

describe('Sqwiggle.organizations', function(){
  var scope = nock('https://api.sqwiggle.com')

  describe('index', function(){
    scope.get('/organizations').reply(200, [ sample_org ])
      
    it('loads the list of organizations', function(done) {
      client.organizations.index(function(err, resp) {
        resp[0].name.should.equal('Google')
        done()
      })
    })
  })

  describe('find', function(){
    scope.get('/organizations/123').reply(200, sample_org)
    it ('loads a single organization', function(done) {
      client.organizations.find(123, function(err, resp) {
        resp.name.should.equal('Google')
        done()
      })
    })
  })

  describe('update', function(){
    sample_org.name = "Yahoo"
    scope.put('/organizations/123').reply(200, sample_org)
    it('updates an existing organization', function(done) {
      client.organizations.update(123, {name: "Yahoo"}, function(err, resp) {
        resp.name.should.equal('Yahoo');
        done()
      })
    })
  })
})
