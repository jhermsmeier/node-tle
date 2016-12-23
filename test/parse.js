var assert = require( 'assert' )
var TLE = require( '../' )

describe( 'TLE.parse', function() {

  it( 'should parse a TLE string with title line', function() {

    var set = 'ISS (ZARYA)\n' +
      '1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927\n' +
      '2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537'

    var tle = TLE.parse( set )

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
      motion: 15.721253915,
      revolution: 6353,
    }

    assert.deepEqual( tle, expected )

  })

  it( 'should parse a TLE string without title line', function() {

    var set = '1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927\n' +
      '2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537'

    var tle = TLE.parse( set )

    var expected = {
      name: '',
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
      motion: 15.721253915,
      revolution: 6353,
    }

    assert.deepEqual( tle, expected )

  })

})
