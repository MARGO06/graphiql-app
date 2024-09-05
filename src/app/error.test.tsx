import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { customRender } from '@/utils/CustomeRenderTest';
import ErrorBoundary from './error';
import { screen, fireEvent } from '@testing-library/react';

describe('ErrorBoundary Page', () => {
  it('renders page', () => {
    const mockError = new Error('Test error message');

    customRender(<ErrorBoundary error={mockError} reset={jest.fn()} />);

    const heading = screen.getByRole('heading', { level: 2, name: /Something went wrong/i });
    expect(heading).toBeInTheDocument();
    const backButton = screen.getByRole('button', {
      name: 'Back to Main page',
    });
    fireEvent.click(backButton);
    expect(useRouter().push).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith('/');
    const tryButton = screen.getByRole('button', {
      name: 'Try again',
    });
    fireEvent.click(tryButton);
    expect(useRouter().push).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith('/main');
  });
});
