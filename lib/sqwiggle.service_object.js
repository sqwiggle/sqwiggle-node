module.exports = ServiceObject

// Options is a hash in this format:
// { endpoints: ['find', 'create', 'destroy'], basePath: '/url' }

function ServiceObject(api, options) {
  this.api = api;

  if(options.endpoints.indexOf('index') > -1) {
    this.index = function(filters, callback) {
      return this.api.get(options.basePath, filters, callback);
    }
  }

  if(options.endpoints.indexOf('find') > -1) {
    this.find = function(id, callback) {
      return this.api.get(options.basePath+'/'+id, null, callback);
    }
  }
  
  if(options.endpoints.indexOf('create') > -1) {
    this.create = function(data, callback) {
      return this.api.post(options.basePath, data, callback)
    }
  }

  if(options.endpoints.indexOf('update') > -1) {
    this.update = function(id, data, callback) {
      return this.api.put(options.basePath+'/'+id, data, callback)
    }
  }

  if(options.endpoints.indexOf('delete') > -1) {
    this.delete = function(id, callback) {
      return this.api.delete(options.basePath+'/'+id, null, callback)
    }
  }

}
