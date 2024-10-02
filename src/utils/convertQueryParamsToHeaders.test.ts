import { convertQueryParamsToHeaders } from './convertQueryParamsToHeaders';

describe('convertQueryParamsToHeaders', () => {
  it('should return an empty array when no params are provided', () => {
    const result = convertQueryParamsToHeaders();
    expect(result).toEqual([]);
  });

  it('should convert query parameters to headers correctly', () => {
    const params = {
      param1: 'value1',
      param2: 'value2',
    };
    const expected = [
      { key: 'param1', value: 'value1', id: '0param1' },
      { key: 'param2', value: 'value2', id: '1param2' },
    ];
    const result = convertQueryParamsToHeaders(params);
    expect(result).toEqual(expected);
  });

  it('should handle empty params object', () => {
    const params = {};
    const result = convertQueryParamsToHeaders(params);
    expect(result).toEqual([]);
  });
});
