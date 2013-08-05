var levelup = require('levelup')
  , bytewise = require('bytewise')
  , uuid = require('node-uuid')
  ;

function Index (file) {
  this.lev = levelup(file, {keyEncoding:'binary', valueEncoding:'json'})
}
Index.prototype.put = function (key, value, cb) {
  this.lev.put(bytewise.encode([key, uuid()]), value, cb)
}
Index.prototype.query = function (start, end, cb) {
  var results = []
    , reader = this.lev.createReadStream(
      { start: bytewise.encode([start])
      , end: bytewise.encode([end])
      })
    , self = this
    ;
  reader.on('data', function (data) {
    data.key = bytewise.decode(data.key)[0]
    results.push(data)
  })
  reader.on('end', function () {
    cb(null, results)
  })
  reader.on('error', cb)
}

module.exports = function (file) {return new Index(file)}