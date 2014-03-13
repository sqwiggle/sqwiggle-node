var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('test_api_key')

sample_attachment = { id: 1234,
            url: 'http://media.giphy.com/media/adyoOZ92ftxgk/200.gif',
            title: null,
            animated: true,
            type: 'image',
            image: 'http://media.giphy.com/media/adyoOZ92ftxgk/200.gif',
            status: null,
            width: null,
            height: null,
            created_at: '2014-03-04T00:20:44Z',
            updated_at: '2014-03-04T00:20:44Z' }

describe('Sqwiggle.attachments', function(){
  var scope = nock('https://api.sqwiggle.com')

  describe('.index', function() {
    scope.get('/attachments')
      .reply(200,  [sample_attachment])
    
    it("loads the list of attachments", function(done) {
      client.attachments.index(null, function(err, resp) {
        if (err) return done(err);
        resp[0].image.should.equal('http://media.giphy.com/media/adyoOZ92ftxgk/200.gif')
        done()
      })
    })

    scope.get('/attachments?page=2&limit=1').reply(200, [sample_attachment])
    it('accepts page and limit', function(done) {
      client.attachments.index({page: 2, limit: 1}, function(err, resp) {
        resp.length.should.equal(1)
        resp[0].image.should.equal('http://media.giphy.com/media/adyoOZ92ftxgk/200.gif')
        done()
      })
    })
  })

  describe('.find', function() {
    scope.get('/attachments/1234').reply(200, sample_attachment)

    it("loads a single attachment", function(done) {
      client.attachments.find(1234, function(err, resp) {
        resp.image.should.equal('http://media.giphy.com/media/adyoOZ92ftxgk/200.gif')
        done()
      })
    })
  })

  describe('.update', function() {
    scope.put('/attachments/1234').reply(200, sample_attachment)

    it("updates an existing attachment", function(done) {
      client.attachments.update(1234, {title: 'foo'}, function(err, resp) {
        resp.id.should.equal(1234)
        done()
      })
    })
  })

  describe('.remove', function() {
    scope.delete('/attachments/1234').reply(200, '')

    it("deletes an existing attachment", function(done) {
      client.attachments.delete(1234, function(err, resp) {
        resp.should.equal('OK')
        done()
      })
    })
  })
})
