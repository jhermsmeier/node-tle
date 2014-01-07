
function TLE() {
  
  if( !(this instanceof TLE) ) {
    return new TLE()
  }
  
}

module.exports = TLE

TLE.prototype = {
  
  constructor: TLE,
  
}
