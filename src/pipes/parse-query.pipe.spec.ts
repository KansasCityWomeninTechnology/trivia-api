import { ParseQueryPipe } from './parse-query.pipe';

enum TestEnum {
  Coding = 'coding',
  And = 'and',
  Cocktails = 'cocktails'
}

interface TestCase {
  description: string;
  param: string | string[] | null;
  expected: string[]
}

describe('ParseQueryPipe', () => {
  it('should be defined', () => {
    expect(new ParseQueryPipe(TestEnum)).toBeDefined();
  });

  describe('transforms', () => {
    const testCases: TestCase[] = [
      {
        description: 'should return enum in an array when one is provided',
        param: 'coding',
        expected: ['coding']
      },
      {
        description: 'should return empty array when no value is provided',
        param: null,
        expected: []
      },
      {
        description: 'should return empty array when one is provided is not a valid enum value',
        param: 'kcwit',
        expected: []
      },
      {
        description: 'should return enums when multiple valid values are provided',
        param: ['and', 'cocktails'],
        expected: ['and', 'cocktails']
      },
      {
        description: 'should return all enums when multiple duplicate valid values are provided',
        param: ['and', 'and'],
        expected: ['and', 'and']
      },
      {
        description: 'should return only valid enums when multiple values are provided',
        param: ['and', 'kcwit'],
        expected: ['and']
      },
      {
        description: 'should return valid enum in lower case if provided value casing is different',
        param: 'COCKTAILS',
        expected: ['cocktails']
      },
      {
        description: 'should return valid enums in lower case if provided multiple values casing is different',
        param: ['COCKTAILS', 'CODING'],
        expected: ['cocktails', 'coding']
      },

    ];

    for (const test of testCases) {
      it(test.description, () => {
        const target = new ParseQueryPipe(TestEnum);
        const result = target.transform(test.param);
        expect(result).toEqual(test.expected);
      })
    }
  })
});
