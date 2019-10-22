var stream = require( 'stream' )
var TLE = require( './tle' )

class Parser extends stream.Transform {

  /**
   * TLE Parser Stream
   * @constructor
   * @param {Object} [options]
   * @return {Parser}
   */
  constructor( options ) {

    options = options || {}
    options.readableObjectMode = true

    super( options )

    this._lineBuffer = ''

  }

  /**
   * Strip empty lines
   * @param  {String} str
   * @return {String}
   */
  static strip( str ) {
    return str.replace( /^[\s\uFEFF\xA0]*$/gm, '' )
  }

  _transform( chunk, _, next ) {

    var buffer = Parser.strip( this._lineBuffer + chunk )
    var match = null
    var tle = null

    while( match = Parser.pattern.exec( buffer ) ) {
      buffer = buffer.slice( match[0].length )
      try { tle = TLE.parse( match[0] ) }
      catch( error ) { return this.emit( 'error', error ) }
      this.push( tle )
    }

    this._lineBuffer = buffer

    next()

  }

}

/**
 * TLE multiline matching pattern
 * @type {RegExp}
 */
Parser.pattern = /(^|\r?\n)(?:([^12][^\r\n]{1,}?)\r?\n)?(1[^\r\n]{68,})\r?\n(2[^\r\n]{68,})/

module.exports = Parser
