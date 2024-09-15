import '@testing-library/jest-dom';
import { act, screen } from '@testing-library/react';
import { AboutUs } from './AboutUs';
import { customRender } from '@/utils/CustomeRenderTest';

describe('About Us', () => {
  it('renders a heading', async () => {
    await act(async () => {
      customRender(<AboutUs />);
    });
    expect(
      screen.getByText((content, element) => {
        const hasText = (text: string) => content.includes(text);
        const isSpan = element?.tagName.toLowerCase() === 'span';
        return isSpan && hasText('We are a team of three junior frontend developers');
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        const hasText = (text: string) => content.includes(text);
        const isSpan = element?.tagName.toLowerCase() === 'span';
        return isSpan && hasText('We follow the Scrum methodology');
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        const hasText = (text: string) => content.includes(text);
        const isSpan = element?.tagName.toLowerCase() === 'span';
        return isSpan && hasText('functional and high-quality product');
      }),
    ).toBeInTheDocument();
  });
});
