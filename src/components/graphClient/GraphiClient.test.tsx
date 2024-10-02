import { screen, fireEvent, act } from '@testing-library/react';
import { GraphClient } from './GraphClient';
import { render } from '@/utils/CustomeRenderTest';
import { handleGetDocumentation } from '@/utils/getDocumentation';

jest.mock('../../utils/getDocumentation', () => ({
  handleGetDocumentation: jest.fn(),
}));

describe('GraphClient Component', () => {
  it('displays the "get documentation" button', async () => {
    await act(async () => {
      render(<GraphClient />);
    });

    const getDocumentationButton = screen.getByRole('button', { name: /get documentation/i });
    expect(getDocumentationButton).toBeInTheDocument();
  });

  it('fetches schema and shows schema button when "get documentation" is clicked', async () => {
    (handleGetDocumentation as jest.Mock).mockResolvedValue([
      { name: 'Type1', fields: [{ name: 'field1', type: { name: 'String' } }] },
      { name: 'Type2', fields: [{ name: 'field2', type: { name: 'Int' } }] },
    ]);

    await act(async () => {
      render(<GraphClient />);
    });

    const urlInput = screen.getByPlaceholderText('Enter endpoint URL');
    const getDocumentationButton = screen.getByRole('button', { name: /get documentation/i });

    await act(async () => {
      fireEvent.change(urlInput, { target: { value: 'https://countries.trevorblades.com/' } });
      fireEvent.click(getDocumentationButton);
    });

    const showDocumentationButton = screen.getByRole('button', { name: /show documentation/i });
    expect(showDocumentationButton).toBeInTheDocument();
  });

  it('toggles the documentation visibility when the "show documentation" button is clicked', async () => {
    (handleGetDocumentation as jest.Mock).mockResolvedValue([
      { name: 'Type1', fields: [{ name: 'field1', type: { name: 'String' } }] },
      { name: 'Type2', fields: [{ name: 'field2', type: { name: 'Int' } }] },
    ]);

    await act(async () => {
      render(<GraphClient />);
    });

    const urlInput = screen.getByPlaceholderText('Enter endpoint URL');
    const getDocumentationButton = screen.getByRole('button', { name: /get documentation/i });

    await act(async () => {
      fireEvent.change(urlInput, { target: { value: 'https://countries.trevorblades.com/' } });
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

  it('displays the "get data" button', async () => {
    await act(async () => {
      render(<GraphClient />);
    });
    const getDataButton = screen.getByRole('button', { name: /get data/i });

    expect(getDataButton).toBeInTheDocument();
  });

  it('displays the response window when responseInfo is available', async () => {
    await act(async () => {
      render(<GraphClient />);
    });

    const responseWindow = screen.queryByTestId('response-window');
    expect(responseWindow).not.toBeInTheDocument();
  });
});
