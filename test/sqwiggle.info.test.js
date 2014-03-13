var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('test_api_key');

describe("Info", function() {
  var scope = nock('https://api.sqwiggle.com')

  describe("Sqwiggle.info.configuration", function() {
    scope.get('/info/configuration')
      .reply(200, {
        storage: { 
          avatars: 'sqwiggle-photos',
          clients: 'sqwiggle-clients',
          uploads: 'sqwiggle-user-uploads' 
        }
      })

    it("loads the configuration info", function(done) {
      client.info.configuration(function(err, response) {
        response.storage.avatars.should.equal('sqwiggle-photos')
        if (err) return done(err);
        done()
      })
    })
  })

  describe("Sqwiggle.info.versions", function() {
    scope.get('/info/versions')
      .reply(200, { 
        web: '', mac: '0.4.5', windows: 0, linux: 0 
      })

    it("loads the versions info", function(done) {
      client.info.versions(function(err, response) {
        response.mac.should.equal('0.4.5')
        if (err) return done(err);
        done()
      })
    })
  })

  describe("Sqwiggle.info.all", function() {
    //   .reply(200, { 
    //   })
    scope.get('/info')
      .reply(200, {
        configuration: {
          storage: { 
            avatars: 'sqwiggle-photos',
            clients: 'sqwiggle-clients',
            uploads: 'sqwiggle-user-uploads' 
          }
        },
        versions: {
          web: '', mac: '0.4.5', windows: 0, linux: 0 
        }
      })

    it("loads all the info", function(done) {
      client.info.all(function(err, response) {
        response.versions.mac.should.equal('0.4.5')
        response.configuration.storage.avatars.should.equal('sqwiggle-photos')
        if (err) return done(err);
        done()
      })
    })
  })

})
