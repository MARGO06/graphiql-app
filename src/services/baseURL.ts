'use client';

export function saveCurrentUrlToLocalStorage() {
  if (typeof window !== 'undefined') {
    let baseUrl = window.location.href;
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }

    localStorage.setItem('baseUrl', baseUrl);
  }
}

export function getCurrentUrlFromLocalStorage() {
  if (typeof window !== 'undefined') {
    const savedUrl = localStorage.getItem('baseUrl');
    return savedUrl;
  }
  return null;
}
