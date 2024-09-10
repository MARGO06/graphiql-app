import '@testing-library/jest-dom';
import { screen, fireEvent, act } from '@testing-library/react';
import { Header } from '@/components/header/Header';
import { customRender } from '@/utils/CustomeRenderTest';

global.fetch = jest.fn();

describe('Header Component', () => {
  it('renders the header with the logo', () => {
    customRender(<Header />);

    const logo = screen.getByRole('link', { name: 'site-logo' });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('sign-out is presented for logged user and user can click the sign-out button', async () => {
    customRender(<Header />);

    const signOutButton = screen.getByText('SIGN OUT');
    expect(signOutButton).toBeInTheDocument();

    await act(async () => {
      fireEvent.submit(signOutButton);
    });
  });

  it('toggles the menu on burger icon click', () => {
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    customRender(<Header />);

    const burgerButton = screen.getByTestId('burger-icon');
    fireEvent.click(burgerButton);
    expect(screen.getByTestId('burger-menu').closest('div')).toHaveClass('menuOpen');

    const burgerClose = screen.getByTestId('burger-close');
    fireEvent.click(burgerClose);
    expect(screen.getByTestId('burger-menu').closest('div')).not.toHaveClass('menuOpen');
  });

  it('user is not logged and can clicks on sign in button', () => {
    customRender(<Header />, { token: null });

    const signInButton = screen.getByTestId('sign-in');
    expect(signInButton).toBeInTheDocument();
  });

  it('user is not logged and can clicks on sign up button', () => {
    customRender(<Header />, { token: null });

    const signUpButton = screen.getByTestId('sign-up');
    expect(signUpButton).toBeInTheDocument();
  });

  it('user can select another language', () => {
    customRender(<Header />, { token: null });

    const switchLanguage = screen.getByRole('combobox');
    expect(switchLanguage).toBeInTheDocument();

    fireEvent.click(switchLanguage);
    const spainLang = screen.getByTestId('es-option');
    fireEvent.click(spainLang);
  });
});
