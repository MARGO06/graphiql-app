import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RestClient from './RestClient';
import translations from '../../../messages/en.json';
import { NextIntlClientProvider } from 'next-intl';

jest.mock('../../services/fetchData', () => ({
  fetchData: jest.fn(),
}));

describe('RestClient Component', () => {
  const renderWithTranslations = (ui: React.ReactElement) => {
    return render(
      <NextIntlClientProvider locale="en" messages={translations}>
        {ui}
      </NextIntlClientProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the RestClient component correctly', () => {
    renderWithTranslations(<RestClient />);

    expect(screen.getByText('RESTfull client')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter endpoint URL')).toBeInTheDocument();
  });

  it('updates the URL input when API is clicked', () => {
    renderWithTranslations(<RestClient />);

    fireEvent.click(screen.getByText('JSONPLACEHOLDER'));

    const input = screen.getByPlaceholderText('Enter endpoint URL');
    expect(input).toHaveValue('https://jsonplaceholder.typicode.com/posts');
  });

  it('shows an error if URL input is empty and Send is clicked', async () => {
    renderWithTranslations(<RestClient />);

    const input = screen.getByPlaceholderText('Enter endpoint URL');
    expect(input).toHaveValue('');

    const button = screen.getByRole('button', { name: 'Send' });

    fireEvent.click(button);

    await waitFor(() => {
      const errorMessages = screen.getAllByText('URL is empty');
      expect(errorMessages[0]).toBeInTheDocument();
    });
  });

  it('adds and removes headers correctly', async () => {
    renderWithTranslations(<RestClient />);

    fireEvent.click(screen.getByText('Add Header'));

    await waitFor(async () => {
      const keyInputs = screen.getAllByPlaceholderText('key (header)');
      const valueInputs = screen.getAllByPlaceholderText('value');

      fireEvent.change(keyInputs[0], { target: { value: 'Authorization' } });
      fireEvent.change(valueInputs[0], { target: { value: 'Bearer token' } });

      expect(keyInputs[0]).toHaveValue('Authorization');
      expect(valueInputs[0]).toHaveValue('Bearer token');

      const removeButton = screen.getByTestId('remove-key');
      fireEvent.click(removeButton);

      await waitFor(() => {
        expect(screen.queryByPlaceholderText('key (header)')).toBeNull();
        expect(screen.queryByPlaceholderText('value')).toBeNull();
      });
    });
  });
});
