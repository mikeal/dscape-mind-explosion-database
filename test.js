var index = require('./')('./testindex')
  , assert = require('assert')
  ;

index.put(['name', 0], 1, function (e) {
  if (e) throw e
  index.put(['name', 1, 8], 1, function (e) {
    if (e) throw e
    index.query(['name'], [{}], function (e, results) {
      if (e) throw e
      assert.equal(2, results.length)
      console.log('works!')
      process.exit()
    })
  })
})