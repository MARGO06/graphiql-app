'use client';

export function saveCurrentUrlToLocalStorage() {
  if (typeof window !== 'undefined') {
    let currentUrl = window.location.href;
    if (currentUrl.endsWith('/')) {
      currentUrl = currentUrl.slice(0, -1);
    }

    localStorage.setItem('currentUrl', currentUrl);
  }
}

export function getCurrentUrlFromLocalStorage() {
  if (typeof window !== 'undefined') {
    const savedUrl = localStorage.getItem('currentUrl');
    return savedUrl;
  }
  return null;
}
