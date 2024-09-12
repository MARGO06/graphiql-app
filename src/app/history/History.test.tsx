import { screen } from '@testing-library/react';
import History from './page';
import { render } from '@/utils/CustomeRenderTest';

describe('History', () => {
  it('renders page without localstorage records', () => {
    render(<History />);

    const textElement = screen.getByText(/You haven't executed any requests yet/i);
    expect(textElement).toBeInTheDocument();
  });
});
