import { replaceVariables } from './replaceVariables';

describe('replaceVariables', () => {
  it('should replace variables correctly in the body', () => {
    const body = 'user:{{name}}, id:{{num}}';
    const variables = [
      { key: 'name', value: 'Adam' },
      { key: 'num', value: '100' },
    ];
    const expected = 'user:Adam, id:100';
    const result = replaceVariables(body, variables);
    expect(result).toBe(expected);
  });

  it('should return the original body if no variables are provided', () => {
    const body = 'user:{{name}}, id:{{num}}';
    const variables: { key: string; value: string }[] = [];
    const expected = 'user:{{name}}, id:{{num}}';
    const result = replaceVariables(body, variables);
    expect(result).toBe(expected);
  });

  it('should handle cases with no placeholders', () => {
    const body = 'user: Alex, id: 15';
    const variables = [{ key: 'name', value: 'Bob' }];
    const expected = 'user: Alex, id: 15';
    const result = replaceVariables(body, variables);
    expect(result).toBe(expected);
  });

  it('should handle cases with missing variables', () => {
    const body = 'user:{{name}}';
    const variables = [{ key: 'login', value: 'true' }];
    const expected = 'user:{{name}}';
    const result = replaceVariables(body, variables);
    expect(result).toBe(expected);
  });

  it('should handle cases with overlapping variable names', () => {
    const body = '{{name}}:{{name}}';
    const variables = [{ key: 'name', value: 'Mary' }];
    const expected = 'Mary:Mary';
    const result = replaceVariables(body, variables);
    expect(result).toBe(expected);
  });
});
