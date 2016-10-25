var fs = require( 'fs' )
var path = require( 'path' )
var TLE = require( '..' )

var FILEPATH = path.join( __dirname, '..', 'test', 'data', 'fengyun-1c-debris.txt' )

var start = Date.now()
var count = 0

fs.createReadStream( FILEPATH )
  .pipe( new TLE.Parser() )
  .on( 'data', function( tle ) {
    count++
    // console.log( tle )
  })
  .once( 'finish', function() {
    var time = Date.now() - start
    var ops = count / ( time / 1000 )
    var opms = count / time
    console.log( 'Parser:', count, 'TLEs,', time + 'ms,', ops.toFixed(), 'op/s' )
    console.log( 'Parser:', opms.toFixed(), 'op/ms' )
  })
