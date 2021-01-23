import { ParseQueryPipe } from './parse-query.pipe';

enum TestEnum {
  A = 'a',
  B = 'b'
}
describe('ParseQueryPipe', () => {
  it('should be defined', () => {
    expect(new ParseQueryPipe(TestEnum)).toBeDefined();
  });
});
