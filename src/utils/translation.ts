import fs from 'fs';
import path from 'path';
import { Translations } from '@/types/translationErrors';

export const loadTranslations = (locale: string): Translations | null => {
  try {
    const filePath = path.resolve(`messages/${locale}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent) as Translations;
  } catch (error) {
    return null;
  }
};
