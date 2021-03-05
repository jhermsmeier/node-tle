import Parser from './stream';

export = TLE;
declare class TLE {
  static createParser(options?: Object): any;
  static parse(value: string): TLE;
  static fromJSON(value: string | Object): TLE;

  name: string;
  number: number;
  class: string;
  id: string;
  date: Date;
  fdmm: number;
  sdmm: number;
  drag: number;
  ephemeris: number;
  esn: number;
  inclination: number;
  ascension: number;
  eccentricity: number;
  perigee: number;
  anomaly: number;
  motion: number;
  revolution: number;

  parse(value: string): TLE;

}

declare namespace TLE {
  const Parser: Parser;
}
