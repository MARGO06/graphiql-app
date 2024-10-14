import { getQueryStringFromHeaders } from './getQueryStringFromHeaders';

describe.skip('getQueryStringFromHeaders', () => {
  it('should return an empty string when no headers are provided', () => {
    const result = getQueryStringFromHeaders([]);
    expect(result).toBe('');
  });

  it('should convert headers to a query string correctly', () => {
    const headers = [
      { key: 'param1', value: 'value1' },
      { key: 'param2', value: 'value2' },
    ];
    const expected = 'param1=value1&param2=value2';
    const result = getQueryStringFromHeaders(headers);
    expect(result).toBe(expected);
  });

  it('should ignore headers with missing key or value', () => {
    const headers = [
      { key: 'param1', value: 'value1' },
      { key: '', value: 'value2' },
      { key: 'param3', value: '' },
      { key: '', value: '' },
    ];
    const expected = 'param1=value1';
    const result = getQueryStringFromHeaders(headers);
    expect(result).toBe(expected);
  });

  it('should encode URI components in headers', () => {
    const headers = [
      { key: 'param with space', value: 'value with space' },
      { key: 'param&special', value: 'value&special' },
    ];
    const expected = 'param%20with%20space=value%20with%20space&param%26special=value%26special';
    const result = getQueryStringFromHeaders(headers);
    expect(result).toBe(expected);
  });
});
