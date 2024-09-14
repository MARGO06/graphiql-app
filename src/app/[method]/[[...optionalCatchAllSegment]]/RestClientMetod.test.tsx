import { screen } from '@testing-library/react';
import RESTfull from './page';
import { useParams } from 'next/navigation';
import { render } from '@/utils/CustomeRenderTest';

describe('RESTfull Factory', () => {
  it.skip('renders RestClient with valid method and url', () => {
    (useParams as jest.Mock).mockReturnValue({
      method: 'GET',
      optionalCatchAllSegment: ['/aHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mg=='],
    });

    render(<RESTfull />);

    const header = screen.getByText('RESTfull client');
    expect(header).toBeInTheDocument();
  });

  it.skip('renders NotFound with invalid method', () => {
    (useParams as jest.Mock).mockReturnValue({
      method: 'INVALID_METHOD',
      optionalCatchAllSegment: ['aHR0cHM6Ly9leGFtcGxlLmNvbQ=='],
    });

    render(<RESTfull />);

    const header = screen.getByText(/Not found/i);
    expect(header).toBeInTheDocument();
  });

  it.skip('correct handles empty optionalCatchAllSegment', () => {
    (useParams as jest.Mock).mockReturnValue({
      method: 'GET',
      optionalCatchAllSegment: '',
    });

    render(<RESTfull />);

    const header = screen.getByText('RESTfull client');
    expect(header).toBeInTheDocument();
  });
});
