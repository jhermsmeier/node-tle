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
  
  var pattern = /([-])?([\.0-9]+)([+-]\d+)?/
  var match = null
  
  if( match = pattern.exec( value ) ) {
    var sign = match[1] === '-' ? -1 : 1
    var power = match[3] ? 'e'+match[3] : 'e0'
    return sign * parseFloat( match[2] + power )
  }
  
  return NaN
  
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
