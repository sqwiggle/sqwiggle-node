var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('test_api_key')

describe('Sqwiggle.attachments', function(){
  var scope = nock('https://api.sqwiggle.com')

  describe('.index', function() {
    scope.get('/attachments')
      .reply(200,  [{ id: 47477,
            url: 'http://media.giphy.com/media/adyoOZ92ftxgk/200.gif',
            title: null,
            animated: true,
            type: 'image',
            image: 'http://media.giphy.com/media/adyoOZ92ftxgk/200.gif',
            status: null,
            width: null,
            height: null,
            created_at: '2014-03-04T00:20:44Z',
            updated_at: '2014-03-04T00:20:44Z' }])

    
    it("loads the list of attachments", function(done) {
      client.attachments.index(function(err, resp) {
        should.not.exist(err)
        resp[0].image.should.equal('http://media.giphy.com/media/adyoOZ92ftxgk/200.gif')
        done()
      })

    })
  })

  describe('.find', function() {
    scope.get('/attachments/47477').reply(200, { id: 47477,
      url: 'http://media.giphy.com/media/adyoOZ92ftxgk/200.gif',
      title: null,
      animated: true,
      type: 'image',
      image: 'http://media.giphy.com/media/adyoOZ92ftxgk/200.gif',
      status: null,
      width: null,
      height: null,
      created_at: '2014-03-04T00:20:44Z',
      updated_at: '2014-03-04T00:20:44Z' })

    it.only("loads a single attachment", function(done) {
      client.attachments.find(47477, function(err, resp) {
        resp.image.should.equal('http://media.giphy.com/media/adyoOZ92ftxgk/200.gif')
        done()
      })
    })
  })

  describe('.update', function() {
    48776
    it("updates an existing attachment")
  })

  describe('.remove', function() {
    it("deletes an existing attachment")
  })
})
