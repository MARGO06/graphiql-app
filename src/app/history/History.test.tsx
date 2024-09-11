import { screen } from '@testing-library/react';
import History from './page';
import { render } from '@/utils/CustomeRenderTest';

describe('History', () => {
  it('renders "History" text', () => {
    render(<History />);

    const textElement = screen.getByText(/History/i);
    expect(textElement).toBeInTheDocument();
  });
});
