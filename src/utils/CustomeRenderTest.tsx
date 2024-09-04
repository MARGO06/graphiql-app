import './globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { AuthProvider } from '@/hooks/useAuth';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import path from 'path';
import fs from 'fs';

type Messages = {
  [key: string]: string | Messages;
};

interface IExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  locale?: string;
  messages?: Messages;
}
(useRouter as jest.Mock).mockReturnValue({
  push: jest.fn(),
});
(usePathname as jest.Mock).mockReturnValue('/');

export const customRender = (ui: ReactNode, options?: IExtendedRenderOptions): RenderResult => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const defaultLocale = 'en';
    const messagesPath = path.join(process.cwd(), 'messages/en.json');
    const messagesFromFile: Messages = JSON.parse(fs.readFileSync(messagesPath, 'utf-8'));

    return (
      <AuthProvider initialToken="mock-token">
        <NextIntlClientProvider
          locale={options?.locale ?? defaultLocale}
          messages={options?.messages ?? messagesFromFile}
        >
          {children}
        </NextIntlClientProvider>
      </AuthProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export { customRender as render };
