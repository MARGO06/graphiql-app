/* import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from './page';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { customRender } from '@/utils/CustomeRenderTest';

// Mock the hooks at the top level, outside of `describe`
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe.skip('SignUp Page', () => {
  const mockReplace = jest.fn();
  const mockUpdateToken = jest.fn();
  const writeUserData = jest.fn() as jest.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    (useAuth as jest.Mock).mockReturnValue({
      updateToken: mockUpdateToken,
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it.skip('renders the RegistrationForm and handles a successful registration', async () => {
    customRender(<SignUp />, { token: null });

    // Check if the form is rendered
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });

    // Mock the fetch call to return a successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mockToken', uid: 'mockUid' }),
      }),
    ) as jest.Mock;

    // Simulate form submission
    fireEvent.click(submitButton);

    // Assert that the registration function was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/saveToken', expect.any(Object));
      expect(mockUpdateToken).toHaveBeenCalledWith('mockToken');
      expect(writeUserData).toHaveBeenCalledWith('mockUid', 'Test User', 'test@example.com');
      expect(mockReplace).toHaveBeenCalledWith('/');
    });
  });

  it.skip('handles registration failure gracefully', async () => {
    customRender(<SignUp />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Mock the fetch call to return an error response
    global.fetch = jest.fn(() => Promise.reject(new Error('Registration failed'))) as jest.Mock;

    fireEvent.click(submitButton);

    // Assert that the registration function handles errors
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/saveToken', expect.any(Object));
      expect(mockUpdateToken).not.toHaveBeenCalled();
      expect(writeUserData).not.toHaveBeenCalled();
      expect(mockReplace).not.toHaveBeenCalled();
    });
  });
});
 */
