import { render, screen } from '@testing-library/react';
import LocaleLayout from './layout';
import { getLocale, getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';

jest.mock('next-intl/server', () => ({
  getLocale: jest.fn(),
  getMessages: jest.fn(),
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

jest.mock('../hooks/useAuth', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../components/header/Header', () => ({
  Header: () => <div>Mocked Header</div>,
}));

jest.mock('../components/footer/Footer', () => ({
  Footer: () => <div>Mocked Footer</div>,
}));

describe('LocaleLayout', () => {
  beforeEach(() => {
    (getLocale as jest.Mock).mockResolvedValue('en');
    (getMessages as jest.Mock).mockResolvedValue({ someMessage: 'message' });
    (cookies as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue({ value: 'mockedJWT' }),
    });
  });

  it('renders the layout with children and proper locale', async () => {
    const children = <div>Mocked Children</div>;
    const TestLocaleLayout = await LocaleLayout({ children });
    const contentInsideBody = TestLocaleLayout.props.children.props.children;

    render(<>{contentInsideBody}</>);

    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
    expect(screen.getByText('Mocked Children')).toBeInTheDocument();
  });

  it('passes the locale and token correctly', async () => {
    const children = <div>Mocked Children</div>;
    const TestLocaleLayout = await LocaleLayout({ children });
    const contentInsideBody = TestLocaleLayout.props.children.props.children;

    render(<>{contentInsideBody}</>);

    expect(getLocale).toHaveBeenCalled();
    expect(getMessages).toHaveBeenCalled();
    expect(cookies).toHaveBeenCalled();
    expect(cookies().get).toHaveBeenCalledWith('JWT');
  });
});
