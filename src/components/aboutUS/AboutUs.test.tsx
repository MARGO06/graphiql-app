import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { AboutUs } from './AboutUs';
import { customRender } from '@/utils/CustomeRenderTest';

describe('NotFound Page', () => {
  it('renders a heading', () => {
    customRender(<AboutUs />);

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
