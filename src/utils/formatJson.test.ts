import { formatJson } from './formatJson';

describe('formatJson', () => {
  let setBodyMock: jest.Mock;
  let setErrorMock: jest.Mock;
  let tMock: jest.Mock;

  beforeEach(() => {
    setBodyMock = jest.fn();
    setErrorMock = jest.fn();
    tMock = jest.fn((key) => key);
  });

  it('should return false if selectMethod is not provided', () => {
    const result = formatJson(
      undefined,
      undefined,
      setBodyMock,
      setErrorMock,
      tMock,
      'application/json',
    );
    expect(result).toBe(false);
  });

  it('should return true and not set body for methods without body', () => {
    const methodsWithoutBody = ['GET', 'DELETE', 'HEAD', 'OPTIONS'];

    methodsWithoutBody.forEach((method) => {
      const result = formatJson(
        undefined,
        method,
        setBodyMock,
        setErrorMock,
        tMock,
        'application/json',
      );
      expect(result).toBe(true);
      expect(setErrorMock).toHaveBeenCalledWith(null);
      expect(setBodyMock).not.toHaveBeenCalled();
    });
  });

  it('should return false and set error if body is empty for POST method', () => {
    tMock.mockReturnValue('body empty');

    const result = formatJson('', 'POST', setBodyMock, setErrorMock, tMock, 'application/json');
    expect(result).toBe(false);
    expect(setErrorMock).toHaveBeenCalledWith('body empty');
  });

  it('should return true and format the body if body is valid JSON', () => {
    const validJson = "{'key': 'value'}";
    const expectedFormattedJson = `{
  "key": "value"
}`;

    const result = formatJson(
      validJson,
      'POST',
      setBodyMock,
      setErrorMock,
      tMock,
      'application/json',
    );
    expect(result).toBe(true);
    expect(setBodyMock).toHaveBeenCalledWith(expectedFormattedJson);
    expect(setErrorMock).toHaveBeenCalledWith(null);
  });

  it('should return false and set syntax error if body is invalid JSON', () => {
    tMock.mockReturnValue('syntax err');

    const invalidJson = "{'key': 'value'";
    const result = formatJson(
      invalidJson,
      'POST',
      setBodyMock,
      setErrorMock,
      tMock,
      'application/json',
    );

    expect(result).toBe(false);
    expect(setErrorMock).toHaveBeenCalledWith('syntax err');
    expect(setBodyMock).not.toHaveBeenCalled();
  });

  it('should return true if contentType is not application/json', () => {
    const result = formatJson(undefined, 'POST', setBodyMock, setErrorMock, tMock, 'text/plain');
    expect(result).toBe(true);
    expect(setErrorMock).not.toHaveBeenCalled();
    expect(setBodyMock).not.toHaveBeenCalled();
  });
});
