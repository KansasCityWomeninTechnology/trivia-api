import { ParseIntWithDefaultPipe } from './parse-int-with-default.pipe';

describe('ParseIntWithDefaultPipe', () => {
  it('should be defined', () => {
    expect(new ParseIntWithDefaultPipe(5)).toBeDefined();
  });
});
