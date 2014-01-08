function TLE() {
  
  if( !(this instanceof TLE) ) {
    return new TLE()
  }
  
  // Line 0
  this.name = ''
  // Line 1
  this.number = 0
  this.id = '00 000 A'
  this.epoch = 14
  this.day = 0.0
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

TLE.parseDate = function parseDate( value ) {
  
  var parts = ( value + '' ).split( /\s+/ )
  var epoch = parseInt( parts[0], 10 )
  var days  = parseFloat( parts[1] )
  
  var year = new Date().getFullYear()
  var century = 100 * Math.floor( year * 1e-2 )
  var currentEpoch = year % 100
  
  year = ( epoch > currentEpoch ) ?
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

TLE.prototype = {
  
  constructor: TLE,
  
  parse: function( value ) {
    return this
  },
  
  toString: function() {
    return ''
  }
  
}
