var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('test_api_key')

var sample_message = { id: 951281,
  created_at: '2014-03-06T20:43:38Z',
  updated_at: '2014-03-06T20:43:38Z',
  room_id: 7516,
  mentions: [],
  author: 
   { id: 127,
          name: 'sqwiggle-node',
     avatar: 'https://sqwiggle-assets.s3.amazonaws.com/assets/api/lightning.png',
     type: 'client' },
  type: 'message',
  text: 'Hello from Nodejs!',
  attachments: [] 
}

describe('Sqwiggle.messages', function(){
  var scope = nock('https://api.sqwiggle.com')

  describe('.index', function() {
    scope.get('/messages').reply(200, [sample_message])

    it("loads the list of messages", function(done){
      client.messages.index(null, function(err, resp) {
        resp[0].text.should.equal('Hello from Nodejs!')
        done()
      })
    })
    
    scope.get('/messages?page=2&limit=1').reply(200, [sample_message])
    it('accepts page and limit', function(done) {
      client.messages.index({page: 2, limit: 1}, function(err, resp) {
        resp.length.should.equal(1)
        resp[0].text.should.equal('Hello from Nodejs!')
        done()
      })
    })

  })

  describe('.find', function(){
    scope.get('/messages/951281').reply(200, sample_message)

    it('loads an individual message', function(done) {
      client.messages.find(951281, function(err, resp) {
        resp.text.should.equal('Hello from Nodejs!')
        done()
      })
    })
  })

  describe('.create', function(){
    scope.post('/messages').reply(201, sample_message)

    it('creates a message', function(done) {
      client.messages.create({room_id: 12345, text: "Hello from Node!"}, function(err, resp){
        should.not.exist(err)
        resp.text.should.equal('Hello from Nodejs!')
        done()
      })
    })
  })

  describe('.update', function() {
    sample_message.text = "foo"
    scope.put('/messages/951281').reply(200, sample_message)
    it('updates an existing message', function(done) {
      client.messages.update(951281, {text: "foo"}, function(err, resp) {
        resp.text.should.equal('foo')
        done()
      })
    })
  })

  describe('.delete', function() {
    scope.delete('/messages/951281').reply(200, '')
    it('deletes an existing message', function(done) {
      client.messages.delete(951281, function(err, resp) {
        resp.should.equal('OK')
        done()
      })
    })
  })
})
