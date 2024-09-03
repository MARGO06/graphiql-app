import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import NotFound from './not-found';
import { useRouter } from 'next/navigation';
import { customRender } from '@/utils/CustomeRenderTest';

describe('NotFound Page', () => {
  it('renders a heading', () => {
    customRender(<NotFound />);

    const heading = screen.getByRole('heading', { level: 2, name: /Not Found/i });
    expect(heading).toBeInTheDocument();
    const backButton = screen.getByRole('button', {
      name: 'Back to Welcome page',
    });
    fireEvent.click(backButton);
    expect(useRouter().push).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith('/');
  });
});
