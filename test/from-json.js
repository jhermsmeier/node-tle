var assert = require( 'assert' )
var TLE = require( '../' )

describe( 'TLE.fromJSON', function() {

  it( 'should parse stringified JSON', function() {

    var expected = {
      name: 'ISS (ZARYA)',
      number: 25544,
      class: 'U',
      id: '98067A',
      date: new Date( '2008-09-20T12:25:40.104Z' ),
      fdmm: -0.00002182,
      sdmm: 0,
      drag: -1.1606,
      ephemeris: 0,
      esn: 292,
      inclination: 51.6416,
      ascension: 247.4627,
      eccentricity: 0.0006703,
      perigee: 130.536,
      anomaly: 325.0288,
      motion: 15.72125391,
      revolution: 56353,
    }

    var data = JSON.stringify( expected )
    var tle = TLE.fromJSON( data )

    assert.deepEqual( tle, expected )

  })

})
