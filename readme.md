```
<dscape>		ideally i would want
<dscape>		range(function (doc) { return 'athlete:u17:w:100dash' }, {type: 'string', collation: 'base'})
<dscape>		and then just query that by whatever i called it :)
<mikeal>		yeah, you could have that, but better
<dscape>		range.query('athlete:u17:w:100dash') // sorted list, accounting for dups
<mikeal>		dude, use arrays
<mikeal>		:)
<mikeal>		seriously, you're going to get them stuck in string slice hell
<dscape>		is there anything like this?
<mikeal>		it's like 10 lines of code
<mikeal>		lemme write this for you real quick
<dscape>		i can see that - you are right
<dscape>		i just want them to understand what they are programing
```

```javascript
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
```

[![Greenkeeper badge](https://badges.greenkeeper.io/mikeal/dscape-mind-explosion-database.svg)](https://greenkeeper.io/)