import { screen } from '@testing-library/react';
import GraphiQL from './page';
import { render } from '@/utils/CustomeRenderTest';

describe('GraphiQL', () => {
  it('renders "GraphiQL" text', () => {
    render(<GraphiQL />);

    const textElement = screen.getByText('GraphiQL');
    expect(textElement).toBeInTheDocument();
  });
});
