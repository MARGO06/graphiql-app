export const initializeApp = jest.fn();
export const getAuth = jest.fn(() => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));
export const getFirestore = jest.fn(() => ({
  collection: jest.fn(),
  doc: jest.fn(),
}));
export const getDatabase = jest.fn(() => ({
  ref: jest.fn(),
}));
