import { screen } from '@testing-library/react';
import RESTfull from './page';
import { useParams } from 'next/navigation';
import { render } from '@/utils/CustomeRenderTest';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => []),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));

describe('RESTfull Factory', () => {
  it('renders RestClient with valid method and url', () => {
    (useParams as jest.Mock).mockReturnValue({
      method: 'GET',
      optionalCatchAllSegment: ['/aHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mg=='],
    });

    render(<RESTfull />);

    const header = screen.getByText('RESTfull client');
    expect(header).toBeInTheDocument();
  });

  it('renders NotFound with invalid method', () => {
    (useParams as jest.Mock).mockReturnValue({
      method: 'INVALID_METHOD',
      optionalCatchAllSegment: ['aHR0cHM6Ly9leGFtcGxlLmNvbQ=='],
    });

    render(<RESTfull />);

    const header = screen.getByText(/Not found/i);
    expect(header).toBeInTheDocument();
  });

  it('correct handles empty optionalCatchAllSegment', () => {
    (useParams as jest.Mock).mockReturnValue({
      method: 'GET',
      optionalCatchAllSegment: '',
    });

    render(<RESTfull />);

    const header = screen.getByText('RESTfull client');
    expect(header).toBeInTheDocument();
  });
});
