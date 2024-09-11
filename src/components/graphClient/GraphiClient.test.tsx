import { screen, fireEvent, act } from '@testing-library/react';
import { GraphClient } from './GraphClient';
import { render } from '@/utils/CustomeRenderTest';
import { handleGetDocumentation } from '@/utils/getDocumentation';

// Mock handleGetDocumentation utility
jest.mock('../../utils/getDocumentation', () => ({
  handleGetDocumentation: jest.fn(),
}));

describe('GraphClient Component', () => {
  it('displays the "get documentation" button', () => {
    render(<GraphClient />);

    const getDocumentationButton = screen.getByRole('button', { name: /get documentation/i });
    expect(getDocumentationButton).toBeInTheDocument();
  });

  it('fetches schema and shows schema button when "get documentation" is clicked', async () => {
    (handleGetDocumentation as jest.Mock).mockResolvedValue({ types: ['Type1', 'Type2'] });

    render(<GraphClient />);

    const getDocumentationButton = screen.getByRole('button', { name: /get documentation/i });

    await act(async () => {
      fireEvent.click(getDocumentationButton);
    });

    const showDocumentationButton = screen.getByRole('button', { name: /show documentation/i });
    expect(showDocumentationButton).toBeInTheDocument();
  });

  it('toggles the documentation visibility when the "show documentation" button is clicked', async () => {
    (handleGetDocumentation as jest.Mock).mockResolvedValue({ types: ['Type1', 'Type2'] });

    render(<GraphClient />);

    const getDocumentationButton = screen.getByRole('button', { name: /get documentation/i });

    await act(async () => {
      fireEvent.click(getDocumentationButton);
    });

    const showDocumentationButton = screen.getByRole('button', { name: /show documentation/i });

    await act(async () => {
      fireEvent.click(showDocumentationButton);
    });

    const documentationElement = screen.getByText(/Type1/i);
    expect(documentationElement).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(showDocumentationButton);
    });

    expect(documentationElement).not.toBeInTheDocument();
  });

  it('displays the "get data" button', () => {
    render(<GraphClient />);

    const getDataButton = screen.getByRole('button', { name: /get data/i });
    expect(getDataButton).toBeInTheDocument();
  });

  it('displays the response window when responseInfo is available', () => {
    render(<GraphClient />);

    const responseWindow = screen.queryByTestId('response-window');
    expect(responseWindow).not.toBeInTheDocument(); // Initially no response window
  });

  it('renders GraphRequest component with props', () => {
    render(<GraphClient />);

    const input = screen.getByPlaceholderText('Enter URL');
    expect(input).toBeInTheDocument();
  });
});
