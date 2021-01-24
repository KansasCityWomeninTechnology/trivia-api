import { ParseIntWithDefaultPipe } from './parse-int-with-default.pipe';

interface TestCase {
  param: string;
  expected: number | null;
  description: string
}

describe('ParseIntWithDefaultPipe', () => {
  it('should be defined', () => {
    expect(new ParseIntWithDefaultPipe(5)).toBeDefined();
  });

  describe('transforms', () => {
    const defaultValue = 5;
    const testCases: TestCase[] = [
      {
        description: 'should return original value when one is provided',
        param: '15',
        expected: 15
      },
      {
        description: 'should return default value when provided value is null',
        param: null,
        expected: 5
      },
      {
        description: 'should return default value when provided value is empty',
        param: '',
        expected: 5
      },
      {
        description: 'should return default value when provided value is not a number',
        param: 'hello!',
        expected: 5
      },
      {
        description: 'should return 0 when provided value is 0',
        param: '0',
        expected: 0
      },
      {
        description: 'should return default value when provided value is negative',
        param: '-42',
        expected: 5
      },
      {
        description: 'should return floor when provided value is decimal',
        param: '4.99',
        expected: 4
      }
    ];

    for (const test of testCases) {
      it(test.description, () => {
        const target = new ParseIntWithDefaultPipe(defaultValue);
        const result = target.transform(test.param);
        expect(result).toEqual(test.expected);
      })
    }
  })
});
