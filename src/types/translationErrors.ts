type TranslationErrors = {
  'auth/wrong-password': string;
  'auth/user-not-found': string;
  'auth/too-many-requests': string;
  'auth/invalid-credential': string;
  'auth/email-already-in-use': string;
  'internal-server-error': string;
};

export type Translations = {
  errors: TranslationErrors;
};
