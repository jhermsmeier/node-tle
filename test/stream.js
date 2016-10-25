var fs = require( 'fs' )
var path = require( 'path' )
var Stream = require( 'stream' )
var assert = require( 'assert' )
var TLE = require( '..' )

var FILEPATH = path.join( __dirname, 'data', 'fengyun-1c-debris.txt' )

describe( 'TLE.Parser', function() {

  it( 'new TLE.Parser()', function() {
    var parser = new TLE.Parser()
    assert.ok( parser instanceof Stream )
    assert.ok( parser instanceof Stream.Transform )
  })

  it( 'createParser()', function() {
    var parser = TLE.createParser()
    assert.ok( parser instanceof Stream )
    assert.ok( parser instanceof Stream.Transform )
  })

  it( 'parses all 2517 TLEs from a stream', function( done ) {

    var count = 0

    fs.createReadStream( FILEPATH )
      .once( 'error', done )
      .pipe( new TLE.Parser() )
      .once( 'error', done )
      .on( 'data', function( tle ) {
        assert.ok( tle instanceof TLE )
        count++
      })
      .once( 'finish', function() {
        var error = count === 2517 ? null :
          new Error( 'Expected 2517 TLEs, saw ' + count )
        done( error )
      })
  })

})
