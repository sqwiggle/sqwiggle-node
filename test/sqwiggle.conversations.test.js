var should = require('should');
var nock = require('nock');
var Sqwiggle = require('../index');
var client = new Sqwiggle('test_api_key')

var sample_conversation = { id: 12345,
  room_id: 1,
  color_id: 2,
  status: 'closed',
  created_at: '2014-03-03T20:46:32Z',
  participating: [],
  participated: 
    [ { id: 123,
        name: 'Steve Jobs',
        avatar: 'https://sqwiggle-photos.s3.amazonaws.com/9432/avatar/9844f81e1408f6ecb932137d33bed7cfdcf518a3_120_120.jpg?1382198598895' },
      { id: 456,
        name: 'Bill Gates',
        avatar: 'https://sqwiggle-photos.s3.amazonaws.com/13025/avatar/9844f81e1408f6ecb932137d33bed7cfdcf518a3_120_120.jpg?1382456760670' } 
    ],
  duration: 134 }

describe('Sqwiggle.conversations', function(){
  var scope = nock('https://api.sqwiggle.com')

  describe('.index', function() {
    scope.get('/conversations').reply(200, [sample_conversation])
    it("loads the list of conversations", function(done) {
      client.conversations.index(function(err, resp) {
        resp[0].room_id.should.equal(1)
        done()
      })
    })
  })

  describe('.find', function() {
    scope.get('/conversations/123').reply(200, sample_conversation)
    it("loads a single conversation", function(done) {
      client.conversations.find(123, function(err, resp) {
        resp.room_id.should.equal(1)
        done()
      })
    })
  })

})
