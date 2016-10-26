function TLE() {

  if( !(this instanceof TLE) ) {
    return new TLE()
  }

  // Line 0
  this.name = ''
  // Line 1
  this.number = 0
  this.class = 'U'
  this.id = '00 000 A'
  this.date = new Date()
  this.fdmm = 0.0
  this.sdmm = 0.0
  this.drag = 0.0
  this.ephemeris = 0
  this.esn = 0
  // Line 2
  this.inclination = 0.0
  this.ascension = 0.0
  this.eccentricity = 0
  this.perigee = 0.0
  this.anomaly = 0.0
  this.motion = 0.0
  this.revolution = 0

}

module.exports = TLE

TLE.parse = function( value ) {
  return new TLE().parse( value )
}

TLE.fromJSON = function( value ) {

  var tle = new TLE()
  var data = typeof value === 'string' ?
    JSON.parse( value ) : value

  var keys = Object.keys( data )

  for( var i = 0; i < keys.length; i++ ) {
    if( tle.hasOwnProperty( keys[i] ) ) {
      tle[ keys[i] ] = data[ keys[i] ]
    }
  }

  return tle

}

TLE.parseFloat = function( value ) {

  var pattern = /([-])?([\.\d]+)([+-]\d+)?/
  var match = null

  if( match = pattern.exec( value ) ) {
    var sign = match[1] === '-' ? -1 : 1
    var power = match[3] ? 'e'+match[3] : 'e0'
    return sign * parseFloat( match[2] + power )
  }

  return NaN

}

TLE.parseDate = function( value ) {

  value = ( value + '' )
    .replace( /^\s+|\s+$/, '' )

  var epoch = parseInt( value.substr( 0, 2 ), 10 )
  var days  = parseFloat( value.substr( 2 ) )

  var year = new Date().getFullYear()
  var currentEpoch = year % 100
  var century = year - currentEpoch

  year = ( epoch > currentEpoch + 1 ) ?
    century - 100 + epoch :
    century + epoch

  var day = Math.floor( days )
  var hours = 24 * ( days - day )
  var hour = Math.floor( hours )
  var minutes = 60 * ( hours - hour )
  var minute = Math.floor( minutes )
  var seconds = 60 * ( minutes - minute )
  var second = Math.floor( seconds )
  var millisecond = 1000 * ( seconds - second )

  var utc = Date.UTC(
    year, 0, day,
    hour, minute, second,
    millisecond
  )

  return new Date( utc )

}

TLE.check = function( line ) {

  var sum = 0

  line.substring( 0, 68 ).replace(
    /[\d-]/g, function( digit ) {
      sum += digit === '-' ?
        1 : +digit
    }
  )

  return sum % 10

}

TLE.trim = function( str ) {
  return str.replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '' )
}

TLE.Parser = require( './stream' )
TLE.createParser = TLE.Parser

TLE.prototype = {

  constructor: TLE,

  parse: function( value ) {

    var lines = TLE.trim( value + '' ).split( /\r?\n/g )
    var line, checksum

    // Line 0
    this.name = TLE.trim( lines.shift() )

    // Line 1
    line = lines.shift()
    checksum = TLE.check( line )

    if( checksum != line.substring( 68, 69 ) ) {
      throw new Error(
        'Line 1 checksum mismatch: ' + checksum + ' != ' +
        line.substring( 68, 69 ) + ': ' + line
      )
    }

    this.number    = TLE.parseFloat( line.substring( 2, 7 ) )
    this.class     = line.substring( 7, 9 ).trim()
    this.id        = line.substring( 9, 18 ).trim()
    this.date      = TLE.parseDate( line.substring( 18, 33 ) )
    this.fdmm      = TLE.parseFloat( line.substring( 33, 44 ) )
    this.sdmm      = TLE.parseFloat( line.substring( 44, 53 ) )
    this.drag      = TLE.parseFloat( line.substring( 53, 62 ) )
    this.ephemeris = TLE.parseFloat( line.substring( 62, 64 ) )
    this.esn       = TLE.parseFloat( line.substring( 64, 68 ) )

    // Line 2
    line = lines.shift()
    checksum = TLE.check( line )

    if( checksum != line.substring( 68, 69 ) ) {
      throw new Error(
        'Line 2 checksum mismatch: ' + checksum + ' != ' +
        line.substring( 68, 69 ) + ': ' + line
      )
    }

    this.inclination  = TLE.parseFloat( line.substring( 8, 17 ) )
    this.ascension    = TLE.parseFloat( line.substring( 17, 26 ) )
    this.eccentricity = line.substring( 26, 34 ).trim()
    this.perigee      = TLE.parseFloat( line.substring( 34, 43 ) )
    this.anomaly      = TLE.parseFloat( line.substring( 43, 52 ) )
    this.motion       = TLE.parseFloat( line.substring( 52, 64 ) )
    this.revolution   = TLE.parseFloat( line.substring( 64, 68 ) )

    return this

  }

}
