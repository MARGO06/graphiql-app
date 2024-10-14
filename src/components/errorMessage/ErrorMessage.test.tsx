import { screen, waitFor } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';
import { render } from '@/utils/CustomeRenderTest';

const mockErrorReset = jest.fn();

describe.skip('ErrorMessage Component', () => {
  it('should display the error message when provided', () => {
    render(<ErrorMessage message="Test Error" duration={3000} errorReset={mockErrorReset} />);

    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('should hide the error message after the specified duration', async () => {
    render(<ErrorMessage message="Test Error" duration={1000} errorReset={mockErrorReset} />);

    expect(screen.getByText('Test Error')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
      },
      { timeout: 1500 },
    ); // Wait a bit longer than the duration
  });

  it('should call errorReset callback when hiding', async () => {
    render(<ErrorMessage message="Test Error" duration={1000} errorReset={mockErrorReset} />);

    await waitFor(
      () => {
        expect(mockErrorReset).toHaveBeenCalled();
      },
      { timeout: 1500 },
    ); // Wait a bit longer than the duration
  });

  it('should not display the error message if no message is provided', () => {
    render(<ErrorMessage message="" duration={3000} errorReset={mockErrorReset} />);

    expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
  });

  it('should clear timeout if component unmounts', () => {
    jest.useFakeTimers();

    const { unmount } = render(
      <ErrorMessage message="Test Error" duration={3000} errorReset={mockErrorReset} />,
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();

    unmount();

    jest.runAllTimers();

    expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
  });
});
