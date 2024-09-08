import { handleFirebaseError } from '@/utils/firebaseError';

interface CustomError extends Error {
  status: number;
  message: string;
  code: string;
}

describe('handleFirebaseError', () => {
  const translations: {
    errors: {
      'auth/wrong-password': string;
      'auth/too-many-requests': string;
      'auth/invalid-credential': string;
      'auth/email-already-in-use': string;
      'auth/user-not-found': string;
      'internal-server-error': string;
    };
  } = {
    errors: {
      'auth/wrong-password': 'Authentication failed',
      'auth/too-many-requests': 'Too many requests. Please try again later',
      'auth/invalid-credential': 'Invalid email or password',
      'auth/email-already-in-use': 'Email already in use. Please use a different email address',
      'auth/user-not-found': 'Authentication failed',
      'internal-server-error': 'An internal server error has occurred. Please try again later',
    },
  };

  test('should throw 401 error for wrong password or user not found', () => {
    const error = {
      code: 'auth/wrong-password',
      status: 401,
      message: 'Authentication failed',
    } as unknown as CustomError;

    expect(() => handleFirebaseError(error, translations)).toThrow(error);
  });

  test('should throw 429 error for too many requests', () => {
    const error = {
      code: 'auth/too-many-requests',
      status: 429,
      message: 'Too many requests. Please try again later',
    } as unknown as CustomError;

    expect(() => handleFirebaseError(error, translations)).toThrow(error);
  });

  test('should throw 400 error for email already in use', () => {
    const error = {
      code: 'auth/invalid-credential',
      status: 400,
      message: 'Invalid email or password',
    } as unknown as CustomError;

    expect(() => handleFirebaseError(error, translations)).toThrow(error);
  });

  test('should throw 400 error for invalid credential', () => {
    const error = {
      code: 'auth/email-already-in-use',
      status: 400,
      message: 'Email already in use. Please use a different email address',
    } as unknown as CustomError;

    expect(() => handleFirebaseError(error, translations)).toThrow(error);
  });

  test('should throw 500 error for unknown errors', () => {
    const error = {
      code: 'internal-server-error',
      status: 500,
      message: 'An internal server error has occurred. Please try again later',
    } as unknown as CustomError;

    expect(() => handleFirebaseError(error, translations)).toThrow(error);
  });
});
