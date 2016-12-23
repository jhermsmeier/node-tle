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

  it( 'should parse a TLE string with title line', function( done ) {

    var set = 'ISS (ZARYA)\n' +
      '1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927\n' +
      '2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537'

    var parser = new TLE.Parser()
    var read = false

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

    parser
      .once( 'error', done )
      .once( 'end', function() {
        if( !read ) done( new Error( 'Did not read TLE' ) )
        else done()
      })
      .once( 'readable', function() {
        var tle = this.read()
        read = true
        assert.deepEqual( tle, expected )
      })
      .end( set )

  })

  it( 'should parse a TLE string without title line', function( done ) {

    var set = '1 25544U 98067A   08264.51782528 -.00002182  00000-0 -11606-4 0  2927\n' +
      '2 25544  51.6416 247.4627 0006703 130.5360 325.0288 15.72125391563537'

    var parser = new TLE.Parser()
    var read = false

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

    parser
      .once( 'error', done )
      .once( 'end', function() {
        if( !read ) done( new Error( 'Did not read TLE' ) )
        else done()
      })
      .once( 'readable', function() {
        var tle = this.read()
        read = true
        assert.deepEqual( tle, expected )
      })
      .end( set )

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
