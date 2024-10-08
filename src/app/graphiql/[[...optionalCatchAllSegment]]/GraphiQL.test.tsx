import { act, screen } from '@testing-library/react';
import GraphiQL from './page';
import { render } from '@/utils/CustomeRenderTest';

describe('GraphiQL', () => {
  it('renders "GraphiQL" text', async () => {
    await act(async () => {
      render(<GraphiQL />);
    });

    const textElement = screen.getByRole('heading', { name: /GraphiQL/i });
    expect(textElement).toBeInTheDocument();
  });
});
