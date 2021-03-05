export = Parser;
declare class Parser {
  static strip(str: string): string;

  constructor(options?: Object);
  _lineBuffer: string;
  _transform(chunk: any, _: any, next: any): any;
}
declare namespace Parser {
  const pattern: RegExp;
}
