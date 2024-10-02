import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from './page';
import { customRender } from '@/utils/CustomeRenderTest';
import { usePathname } from 'next/navigation';

describe('SignUp Page', () => {
  it('renders the RegistrationForm and handles a successful registration', async () => {
    (usePathname as jest.Mock).mockReturnValue('/signIn');

    customRender(<SignIn />, { token: null });

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123!' } });

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
