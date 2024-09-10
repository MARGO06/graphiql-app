import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { authenticate } from './aunthenticate';
import { FirebaseError } from 'firebase/app';
import { Translations } from '@/types/translationErrors';
import { handleFirebaseError } from './firebaseError';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(),
}));
jest.mock('./firebaseError', () => ({
  handleFirebaseError: jest.fn(),
}));

const translations: Translations = {
  errors: {
    'auth/too-many-requests': 'too many requests',
    'auth/invalid-credential': 'invalid-credential',
    'auth/email-already-in-use': 'email-already-in-use',
    'internal-server-error': 'Internal Server Error',
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Wrong password',
  },
};

describe('authenticate function', () => {
  let email: string;
  let password: string;

  beforeEach(() => {
    email = 'test123@example.com';
    password = 'testPassword123!';
  });

  test('should sign in a user with valid credentials', async () => {
    const mockUserCredential = {
      user: {
        getIdToken: jest.fn().mockResolvedValue('mockedToken'),
        uid: 'mockedUID',
      },
    };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

    const result = await authenticate(email, password, true, translations);
    expect(result.token).toBe('mockedToken');
    expect(result.uid).toBe('mockedUID');
  });

  test('should create a new user with valid credentials', async () => {
    const mockUserCredential = {
      user: {
        getIdToken: jest.fn().mockResolvedValue('mockedToken'),
        uid: 'mockedUID',
      },
    };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

    const newEmail = `test_${Date.now()}@example.com`;

    const result = await authenticate(newEmail, password, false, translations);
    expect(result.token).toBe('mockedToken');
    expect(result.uid).toBe('mockedUID');
  });

  test('should throw an error if the user is not found during sign-in', async () => {
    const error = new FirebaseError('auth/user-not-found', 'User not found');
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

    (handleFirebaseError as unknown as jest.Mock).mockImplementation(() => {
      throw error;
    });

    await expect(
      authenticate('nonexistent@example.com', password, true, translations),
    ).rejects.toThrow('User not found');
  });

  test('should throw an error if the email is not found during sign-in', async () => {
    const error = new FirebaseError('auth/invalid-email', 'Invalid email address');
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

    (handleFirebaseError as unknown as jest.Mock).mockImplementation(() => {
      throw error;
    });

    await expect(
      authenticate('nonexistent@example.com', password, true, translations),
    ).rejects.toThrow('Invalid email address');
  });

  test('should handle FirebaseError during authentication', async () => {
    const error = new FirebaseError('auth/wrong-password', 'Wrong password');
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

    (handleFirebaseError as unknown as jest.Mock).mockImplementation(() => {
      throw error;
    });

    await expect(authenticate(email, 'wrongPassword', true, translations)).rejects.toThrow(
      'Wrong password',
    );
  });
});
