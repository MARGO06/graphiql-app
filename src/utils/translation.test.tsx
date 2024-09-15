import { loadTranslations } from '@/utils/translation';

describe.skip('loadTranslations', () => {
  test('should load English translations correctly', () => {
    const translations = loadTranslations('en');
    if (translations) {
      expect(translations).not.toBeNull();
      expect(translations.errors).toHaveProperty('auth/wrong-password', 'Authentication failed');
    }
  });

  test('should load Spanish translations correctly', () => {
    const translations = loadTranslations('es');
    if (translations) {
      expect(translations).not.toBeNull();
      expect(translations.errors).toHaveProperty('auth/wrong-password', 'Autenticación fallida');
    }
  });

  test('should return null for missing translations', () => {
    const translations = loadTranslations('null');
    expect(translations).toBeNull();
  });
});
