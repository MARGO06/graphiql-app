import { getCurrentUrlFromLocalStorage } from '@/services/baseURL';
import { decodeBase64, getUrl } from '@/services/createUrl';

jest.mock('./baseURL', () => ({
  getCurrentUrlFromLocalStorage: jest.fn(),
}));

describe('getUrl', () => {
  beforeEach(() => {
    (getCurrentUrlFromLocalStorage as jest.Mock).mockReturnValue('http://localhost:3000');
  });

  it('should construct a URL with method, currentUrl, body, and headers', () => {
    const method = 'apiMethod';
    const currentUrl = 'testUrl';
    const body = '';
    const headerParams = 'Authorization=Bearer%20token';
    const isSend = false;

    const url = getUrl(method, currentUrl, body, headerParams, isSend);
    expect(url).toBe(
      'http://localhost:3000/apiMethod/' +
        btoa(unescape(encodeURIComponent(currentUrl))) +
        '?' +
        encodeURIComponent('Authorization') +
        '=' +
        encodeURIComponent('Bearer token'),
    );
  });

  it('should handle URL without body and headers', () => {
    const method = 'apiMethod';
    const currentUrl = 'testUrl';
    const body = '';
    const headerParams = '';
    const isSend = false;

    const url = getUrl(method, currentUrl, body, headerParams, isSend);
    expect(url).toBe(
      'http://localhost:3000/apiMethod/' + btoa(unescape(encodeURIComponent(currentUrl))),
    );
  });

  it('should handle URL and body', () => {
    const method = 'apiMethod';
    const currentUrl = 'testUrl';
    const body = 'testbody';
    const headerParams = '';
    const isSend = false;

    const url = getUrl(method, currentUrl, body, headerParams, isSend);
    expect(url).toBe(
      'http://localhost:3000/apiMethod/' +
        btoa(unescape(encodeURIComponent(currentUrl))) +
        '/' +
        btoa(unescape(encodeURIComponent(body))),
    );
  });

  it('should handle only method', () => {
    const method = 'apiMethod';
    const currentUrl = '';
    const body = '';
    const headerParams = '';
    const isSend = false;

    const url = getUrl(method, currentUrl, body, headerParams, isSend);
    expect(url).toBe('http://localhost:3000/apiMethod/');
  });

  it('should handle full url with isSend true, ', () => {
    const method = 'apiMethod';
    const currentUrl = 'testUrl';
    const body = 'testbody';
    const headerParams = 'Authorization=Bearer%20token';
    const isSend = true;

    const url = getUrl(method, currentUrl, body, headerParams, isSend);
    expect(url).toBe(
      'http://localhost:3000/apiMethod/' +
        btoa(unescape(encodeURIComponent(currentUrl))) +
        '/' +
        btoa(unescape(encodeURIComponent(body))) +
        '?' +
        encodeURIComponent('Authorization') +
        '=' +
        encodeURIComponent('Bearer token'),
    );
  });

  describe('decodeBase64', () => {
    it('should decode a valid base64 encoded string', () => {
      const encoded = btoa('Hello World!');
      expect(decodeBase64(encoded)).toBe('Hello World!');
    });

    it('should return an empty string for an invalid base64 encoded string', () => {
      const invalidEncoded = 'invalidString!!';
      expect(decodeBase64(invalidEncoded)).toBe('');
    });

    it('should return an empty string when decodeURIComponent fails', () => {
      const invalidURIComponent = '%E0%A4%A';
      expect(decodeBase64(invalidURIComponent)).toBe('');
    });

    it('should throw an error for a non-base64 string after decoding URL component', () => {
      const nonBase64 = 'not_base64_encoded';
      expect(decodeBase64(nonBase64)).toBe('');
    });
  });
});
