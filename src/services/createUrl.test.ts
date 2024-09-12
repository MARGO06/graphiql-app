import { getCurrentUrlFromLocalStorage } from '@/services/baseURL';
import { getUrl } from '@/services/createUrl';

jest.mock('./baseURL', () => ({
  getCurrentUrlFromLocalStorage: jest.fn(),
}));

describe('getUrl', () => {
  beforeEach(() => {
    (getCurrentUrlFromLocalStorage as jest.Mock).mockReturnValue('http://localhost:3000');
  });

  it.skip('should construct a URL with method, currentUrl, body, and headers', () => {
    const method = 'apiMethod';
    const currentUrl = 'testUrl';
    // TODO body was defined as "null | underfined" in getUrl()
    const body = undefined;
    const headers = { Authorization: 'Bearer token' };

    const url = getUrl(method, currentUrl, body, headers);
    expect(url).toBe(
      'http://localhost:3000/apiMethod/' +
        btoa(unescape(encodeURIComponent(currentUrl))) +
        // TODO after implementation of body we can uncomemnt line and modify code
        // '/' + btoa(unescape(encodeURIComponent(JSON.stringify(body)))) +
        '?' +
        encodeURIComponent('Authorization') +
        '=' +
        encodeURIComponent('Bearer token'),
    );
  });

  it.skip('should handle URL without body and headers', () => {
    const method = 'apiMethod';
    const currentUrl = 'testUrl';

    const url = getUrl(method, currentUrl);
    expect(url).toBe(
      'http://localhost:3000/apiMethod/' + btoa(unescape(encodeURIComponent(currentUrl))),
    );
  });

  it.skip('should handle URL with headers but no body', () => {
    const method = 'apiMethod';
    const currentUrl = 'testUrl';
    const headers = { Authorization: 'Bearer token' };

    const url = getUrl(method, currentUrl, null, headers);
    expect(url).toBe(
      'http://localhost:3000/apiMethod/' +
        btoa(unescape(encodeURIComponent(currentUrl))) +
        '?' +
        encodeURIComponent('Authorization') +
        '=' +
        encodeURIComponent('Bearer token'),
    );
  });
});
