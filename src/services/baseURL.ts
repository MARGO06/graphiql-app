'use client';

export function saveCurrentUrlToLocalStorage() {
  if (typeof window !== 'undefined') {
    const currentUrl = window.location.href;
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
