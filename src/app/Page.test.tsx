import { fireEvent, render, screen } from '@testing-library/react';
import Home from './page';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/hooks/useAuth';
import { NextIntlClientProvider } from 'next-intl';
import { defaultLocale } from '@/config';
import { Layout } from '@/components/mainLayout/MainLayout';
import { cookies } from 'next/headers';

describe('Integration: Main Page', () => {
  test('Header is visible', async () => {
    const messages = (await import('../../messages/en.json')).default;
    (usePathname as jest.Mock).mockReturnValue('/');

    render(
      <AuthProvider initialToken={cookies().get('JWT')?.value || null}>
        <NextIntlClientProvider locale={defaultLocale} messages={messages}>
          <Layout>
            <Home />
          </Layout>
        </NextIntlClientProvider>
      </AuthProvider>,
    );

    const headerWelcome = screen.getByRole('heading', { name: /Welcome,/i });
    expect(headerWelcome).toBeInTheDocument();
    const restClient = screen.getByText(/RESTfull/i);
    fireEvent.click(restClient);
  });
});
