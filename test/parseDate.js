var assert = require( 'assert' )
var TLE = require( '../' )

describe( 'TLE.parseDate', function() {
  
  it( 'should work', function() {
    var date = TLE.parseDate( '06040.85138889' )
  })
  
  it( 'Hell, I do hate writing tests', function() {
    var date = TLE.parseDate( '14006.78411147' )
    assert.equal( date.getFullYear(), 2014 )
    assert.equal( date.getDay(), 2 )
  })
  
  it( 'should ignore whitespace between epoch and days', function() {
    var date = TLE.parseDate( '14 006.78411147' )
    assert.equal( date.getFullYear(), 2014 )
    assert.equal( date.getDay(), 2 )
  })
  
  it( 'should drop to last century', function() {
    var date = TLE.parseDate( '86 046.78411147' )
    assert.equal( date.getFullYear(), 1986 )
  })
  
  it( 'should go back to the future', function() {
    var year = new Date().getFullYear()
    var epoch = year % 100 + 1
    var date = TLE.parseDate( epoch + '046.78411147' )
    assert.equal( date.getFullYear(), year + 1 )
  })
  
})
