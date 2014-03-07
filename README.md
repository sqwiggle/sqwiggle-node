sqwiggle-node
=============

Node.js library for the Sqwiggle API

## Installation

    npm install sqwiggle-node


## Configuration

Create an API Client at https://www.sqwiggle.com/company/clients

Then you can instantiate the API client:

    var Sqwiggle = require("sqwiggle-node");
    var token = '...'; // Your API token here
    var client = new Sqwiggle(token);


## Usage

### Services

The module exports an API wrapper that you can use to query any of the existing API endpoints. There are 4 patterns for API calls:

    // Index actions
    client.service.index({data: "for filtering or updating"}, function(error, response) {
      // handle response or error here.
      // response will be an array of objects of type service
    })

    // Find actions
    client.service.find(objectId, function(error, response) { })

    // Create actions
    client.service.create({object: "data", goes: "here"}, function(error, response) { })

    // Update actions
    client.service.update(objectId, {object: "data", goes: "here"}, function(error, response) { })

    // Delete actions
    client.service.delete(objectId, function(error, response) { })


### Available Services

There are 7 services that follow this pattern:

- messages
- invites
- conversations
- attachments
- organizations
- rooms
- users

As well as one that does not:

- info

which has 3 endpoints:

  client.info.configuration
  client.info.versions
  client.info.all

For more information on the endpoints and parameters, check out the [Sqwiggle API documentation](https://www.sqwiggle.com/docs)


### Sample Calls

    var Sqwiggle = require("sqwiggle-node");
    var token = '...'; // Your API token here.
    var client = new Sqwiggle(token);

    // Get a list of all the rooms
    client.rooms.index(null, function(err, resp) {
      if(err) {
        console.log(err);
      } else {
        console.log(resp);
      }
    }

    // Get the last 5 messages
    client.messages.index({page: 1, limit: 5}, function(err, resp) {
      if(err) {
        console.log(err);
      } else {
        console.log(resp);
      }
    }

    // Create a message in a room
    client.messages.create({text: 'Hello from Node!', room_id: 12345}, function(err, resp) {
      if(err) {
        // there was an issue creating the message
      } else {
        console.log(resp)
      }
    }

    // Change an attachment to a message
    client.attachment.update(12345, {title: 'Fun Image!'}, function(err, resp) {
      if(err) {
        // there was an issue updating the attachment
      } else {
        console.log(resp)
      }
    })

    // Delete an invitation
    client.invites.delete(4321, function(err, resp) {
      if(err) {
        // didn't work
      } else {
        // Response will always be 'OK' for successful deletes.
        console.log(resp)
      }
    }

    // Get all of the info on client versions and current configuration:
    client.info.all(function(err, resp) {
      if(err) {
        // something went wrong
      } else {
        console.log(resp)
      }
    })





## Contributing

### Test dependencies
    npm install mocha
    npm install should
    npn install nock

### Running tests:
    make test

### The Fun Part
1. Fork the project
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Write a test for your use-case
1. Implement the use-case
1. Commit your changes (`git commit -am "Adding some feature"`)
1. Push to the branch(`git push origin my-new-feature`)
1. Open a new Pull Request

