import { decodeUrlFromBase64 } from './base64';
import { getURL } from './getURL';
import { updateUrl, updateSdlUrl } from './getURL';

it('get encoded url without params', () => {
  const url = 'https://pokeapi.co/api/v2';
  updateUrl(url);
  expect(window.location.pathname).toEqual(
    '/null/graphiql/aHR0cHMlM0ElMkYlMkZwb2tlYXBpLmNvJTJGYXBpJTJGdjI=',
  );
});

it('get encoded url without params', () => {
  const url = 'aHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mg==';
  const { sdlParam, urlNew } = getURL(url);
  expect(sdlParam).toEqual(undefined);
  expect(urlNew).toEqual('https://pokeapi.co/api/v2');
});

it('dencode url', () => {
  const url = 'aHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mg==';
  const result = decodeUrlFromBase64(url);
  expect(result).toEqual('https://pokeapi.co/api/v2');
});

it('get encoded url without params', () => {
  const sdl = 'https://countries.trevorblades.com/?sdl';
  const url = 'https://countries.trevorblades.com/';
  const result = updateSdlUrl(sdl, url);
  expect(result).toEqual('https://countries.trevorblades.com/?sdl=JTNGc2Rs');
});
