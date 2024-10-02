import { render, screen } from '@testing-library/react';
import { ResponseWindow } from './ResponseWindow';
import { useTranslations } from 'next-intl';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

describe('ResponseWindow Component', () => {
  const mockTranslations: { [key: string]: string } = {
    'response info': 'Response Info',
    status: 'Status',
    'content-type': 'Content-Type',
  };

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => mockTranslations[key]);
  });

  it('should render response info with status 200 and application/json content type', () => {
    const responseInfo = {
      status: 200,
      statusText: 'OK',
      contentType: 'application/json',
      data: { message: 'Success' },
    };

    render(<ResponseWindow responseInfo={responseInfo} />);

    expect(screen.getByText('Response Info')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('200 OK')).toBeInTheDocument();
    expect(screen.getByText('Content-Type:')).toBeInTheDocument();
    expect(screen.getByText('application/json')).toBeInTheDocument();
    expect(screen.getByTestId('json-pretty')).toHaveTextContent('{ "message": "Success" }');
  });

  it('should render response info with status 404 and text/plain content type', () => {
    const responseInfo = {
      status: 404,
      statusText: 'Not Found',
      contentType: 'text/plain',
      data: 'Resource not found',
    };

    render(<ResponseWindow responseInfo={responseInfo} />);

    expect(screen.getByText('Response Info')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Content-Type:')).toBeInTheDocument();
    expect(screen.getByText('text/plain')).toBeInTheDocument();
    expect(screen.getByText('Resource not found')).toBeInTheDocument();
  });

  it('should render unsupported content type message', () => {
    const responseInfo = {
      status: 500,
      statusText: 'Internal Server Error',
      contentType: 'image/png',
      data: null,
    };

    render(<ResponseWindow responseInfo={responseInfo} />);

    expect(screen.getByText('Response Info')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('500 Internal Server Error')).toBeInTheDocument();
    expect(screen.getByText('Content-Type:')).toBeInTheDocument();
    expect(screen.getByText('image/png')).toBeInTheDocument();
    expect(screen.getByText('Unsupported content type: image/png')).toBeInTheDocument();
  });

  it('should apply the correct success status class when status is 200', () => {
    const responseInfo = {
      status: 200,
      statusText: 'OK',
      contentType: 'application/json',
      data: { message: 'Success' },
    };

    render(<ResponseWindow responseInfo={responseInfo} />);

    const statusElement = screen.getByText('200 OK');
    expect(statusElement).toHaveClass('statusSuccess'); // Assuming 'statusSuccess' is the class name for success status
  });

  it('should apply the correct error status class when status is not 200', () => {
    const responseInfo = {
      status: 500,
      statusText: 'Internal Server Error',
      contentType: 'application/json',
      data: null,
    };

    render(<ResponseWindow responseInfo={responseInfo} />);

    const statusElement = screen.getByText('500 Internal Server Error');
    expect(statusElement).toHaveClass('statusError'); // Assuming 'statusError' is the class name for error status
  });
});
