import './globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { AuthProvider } from '@/hooks/useAuth';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';

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
    const defaultMessagesEng = {
      en: {
        Registration: {
          signin: 'SIGN IN',
          signup: 'SIGN UP',
        },
        Error: {
          welcome: 'Something went wrong',
          tryagain: 'Try again',
          back: 'Back to Main page',
        },
        NotFound: {
          welcome: 'Not Found: ',
          info: 'Could not find requested resource',
          back: 'Back to Welcome page',
        },
        restClient: {
          name: 'RESTfull client',
          send: 'Send',
        },
        WelcomePage: {
          welcome: 'Welcome',
          history: 'History',
          signin: 'SIGN IN',
          signup: 'SIGN UP',
          part1:
            'We are a team of three junior frontend developers (React Course) from RSS School, working on our final project, APIQuest. You can find more information about us and the school in the site footer.',
          part2:
            'We follow the Scrum methodology, using Jira for project management and Confluence for documentation. Our daily standups are at 10:00 UTC+2. Our comprehensive project documentation includes role descriptions, project architecture, meeting minutes (MoM), and other essential information. The main communication channel is the Discord/DreamTeam server.',
          part3:
            "We are committed to creating a functional and high-quality product, leveraging the experience we've gained throughout our training. We collaborate actively, share ideas, and solve problems together, which helps us enhance our skills and grow as professionals.",
        },
        'SignIn/SignUp': {
          name: 'Name',
          'enter your name': 'Enter your name',
          email: 'Email',
          'enter your email': 'Enter your email',
          password: 'Password',
          'enter your password': 'Enter your password',
          'confirm password': 'Confirm password',
          submit: 'Submit',
          'email is required': 'email is required',
          'please enter a valid email address': 'please enter a valid email address',
          'password is required': 'password is required',
          'name is required': 'name is required',
          'first letter must be uppercase': 'first letter must be uppercase',
          'email should not contain dots at the beginning @':
            'email should not contain dots at the beginning @',
          'password must be at least 8 characters': 'password must be at least 8 characters',
          'password should contain at least 1 letter': 'password should contain at least 1 letter',
          'password should contain at least 1 digit': 'password should contain at least 1 digit',
          'password must contain at least 1 special character':
            'password must contain at least 1 special character',
          'confirm password is required': 'confirm password is required',
          'passwords must match': 'passwords must match',
        },
        Header: {
          'sign out': "SIGN OUT'",
        },
      },
    };

    return (
      <AuthProvider initialToken="mock-token">
        <NextIntlClientProvider
          locale={options?.locale ?? defaultLocale}
          messages={options?.messages ?? defaultMessagesEng.en}
        >
          {children}
        </NextIntlClientProvider>
      </AuthProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export { customRender as render };
