var assert = require( 'assert' )
var TLE = require( '../' )

describe( 'TLE.parseFloat', function() {

  it( 'should parse a number', function() {
    var num = TLE.parseFloat( 1000 )
    assert.equal( num, 1000 )
  })

  it( 'should parse a string', function() {
    var num = TLE.parseFloat( '1000' )
    assert.equal( num, 1000 )
  })

  it( 'should parse a negative value', function() {
    var num = TLE.parseFloat( '-11606' )
    assert.equal( num, -11606 )
  })

  it( 'should parse a value with positive exponent', function() {
    var num = TLE.parseFloat( '11606+4' )
    assert.equal( num, 11606e4 )
  })

  it( 'should parse a value with negative exponent', function() {
    var num = TLE.parseFloat( '11606-4' )
    assert.equal( num, 11606e-4 )
  })

  it( 'should parse a signed value with exponent', function() {
    var num = TLE.parseFloat( '-11606-4' )
    assert.equal( num, -11606e-4 )
  })

  it( 'should parse a decimal fraction', function() {
    var num = TLE.parseFloat( '12.035' )
    assert.equal( num, 12.035 )
  })

  it( 'should parse a decimal fraction with exponent', function() {
    var num = TLE.parseFloat( '-11.606+4' )
    assert.equal( num, -11.606e4 )
  })

  it( 'should parse a decimal fraction without leading zero', function() {
    var num = TLE.parseFloat( '.35' )
    assert.equal( num, 0.35 )
  })

  it( 'should parse a decimal fraction with exponent without leading zero', function() {
    var num = TLE.parseFloat( '.35+3' )
    assert.equal( num, 0.35e3 )
  })

})
