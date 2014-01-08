Two-line element set (TLE)
==========================
[![build status](https://secure.travis-ci.org/jhermsmeier/node-tle.png)](http://travis-ci.org/jhermsmeier/node-tle)
[![NPM version](https://badge.fury.io/js/tle.png)](https://npmjs.org/tle)

A two-line element set ([TLE]) is a data format used to convey sets of orbital elements that describe the orbits of Earth-orbiting satellites. A computer program called a model can use the TLE to compute the position of a satellite at a particular time. The TLE is a format specified by NORAD and used by [NORAD] and [NASA]. The TLE can be used directly by the [SGP4] model (or one of the SGP8, [SDP4], SDP8 models). Orbital elements are determined for many thousands of space objects by NORAD and are freely distributed on the Internet in the form of TLEs. A TLE consists of a title line followed by two lines of formatted text.

> From [Wikipedia](http://en.wikipedia.org/wiki/Two-line_element_set)

[TLE]: http://en.wikipedia.org/wiki/Two-line_element_set
[NORAD]: http://en.wikipedia.org/wiki/NORAD
[NASA]: http://en.wikipedia.org/wiki/NASA
[SGP4]: http://en.wikipedia.org/wiki/SGP4
[SDP4]: http://en.wikipedia.org/wiki/SDP4


Install via [npm](https://npmjs.org)
------------------------------------
```sh
$ npm install tle
```

Format
------

**More,  detailed information is available at [NASA Human Space Flight](http://spaceflight.nasa.gov/realdata/sightings/SSapplications/Post/JavaSSOP/SSOP_Help/tle_def.html):**

[![TLE](http://spaceflight.nasa.gov/realdata/sightings/SSapplications/Post/JavaSSOP/SSOP_Help/2line.gif)](http://spaceflight.nasa.gov/realdata/sightings/SSapplications/Post/JavaSSOP/SSOP_Help/tle_def.html)

> From [NASA Human Space Flight](http://spaceflight.nasa.gov/realdata/sightings/SSapplications/Post/JavaSSOP/SSOP_Help/tle_def.html):
