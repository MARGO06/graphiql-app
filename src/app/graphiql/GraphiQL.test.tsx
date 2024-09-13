import { screen } from '@testing-library/react';
import GraphiQL from './[[...optionalCatchAllSegment]]/page';
import { render } from '@/utils/CustomeRenderTest';

describe('GraphiQL', () => {
  it('renders "GraphiQL" text', () => {
    render(<GraphiQL />);

    const textElement = screen.getByRole('heading', { name: /GraphiQL/i });
    expect(textElement).toBeInTheDocument();
  });
});
