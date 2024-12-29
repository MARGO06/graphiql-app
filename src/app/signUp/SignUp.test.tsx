import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SingUp from './page';
import { customRender } from '@/utils/CustomeRenderTest';
import { usePathname } from 'next/navigation';

describe('SignUp Page', () => {
  it('renders the RegistrationForm and handles a successful registration', async () => {
    (usePathname as jest.Mock).mockReturnValue('/signUp');

    customRender(<SingUp />, { token: null });

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByTestId('password');
    const passwordConfirmInput = screen.getByTestId('password-confirm');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123!' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'password123!' } });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            token: 'mockToken',
            uid: 'mockedUID',
          }),
      }),
    ) as jest.Mock;

    await act(async () => {
      fireEvent.submit(submitButton);
    });
  });
});
