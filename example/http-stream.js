var http = require( 'http' )
var TLE = require( '..' )

// 100 (or so) brightest objects
// @see http://www.celestrak.com/NORAD/elements/master.asp
var DATA_URL = 'http://www.celestrak.com/NORAD/elements/visual.txt'

function exit( error ) {
  console.error( error.stack )
  process.exit(1)
}

var req = http.get( DATA_URL, function( response ) {

  if( response.statusCode !== 200 )
    return exit( new Error( `HTTP ${response.statusCode} ${response.statusMessage}` ) )

  var start = Date.now()
  var count = 0

  response.pipe( new TLE.Parser() )
    .once( 'error', exit )
    .on( 'data', function( tle ) {
      count++
      // console.log( tle )
    })
    .once( 'finish', function() {
      var time = Date.now() - start
      var ops = count / ( time / 1000 )
      console.log( 'Parser:', count, 'TLEs,', time + 'ms,', ops.toFixed(), 'op/s' )
    })

})

req.once( 'error', exit )
