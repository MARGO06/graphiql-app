import '@testing-library/jest-dom';
import { act, fireEvent, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { render } from '@/utils/CustomeRenderTest';

describe('Footer Component', () => {
  it('renders the footer container', async () => {
    await act(async () => {
      render(<Footer />);
    });
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('renders the GitHub links', async () => {
    await act(async () => {
      render(<Footer />);
    });
    const githubLinks = [
      'https://github.com/MARGO06',
      'https://github.com/comtvset',
      'https://github.com/maria-akulova',
    ];

    githubLinks.forEach((link, index) => {
      const githubLink = screen.getAllByRole('link', { name: 'logo' });
      expect(githubLink[index]).toHaveAttribute('href', link);
    });
  });

  it('renders the GitHub logos', async () => {
    await act(async () => {
      render(<Footer />);
    });
    const logos = [
      { alt: 'logo', src: 'github-mark-white.png' },
      { alt: 'logo', src: 'github-mark-orange.png' },
      { alt: 'logo', src: 'github-mark-blue.png' },
    ];

    logos.forEach((logo, index) => {
      const logoImages = screen.getAllByAltText(logo.alt);
      const srcValue = logoImages[index].getAttribute('src');

      expect(srcValue).toContain(logo.src);
    });
  });

  it('renders the year text', async () => {
    await act(async () => {
      render(<Footer />);
    });
    const yearText = screen.getByText(/2024/i);
    expect(yearText).toBeInTheDocument();
  });

  it('renders the school link and logo', async () => {
    await act(async () => {
      render(<Footer />);
    });
    const schoolLink = screen.getByRole('link', { name: /flag/i });
    expect(schoolLink).toHaveAttribute('href', 'https://rs.school');

    fireEvent.click(schoolLink);
    expect(schoolLink).toBeInTheDocument();
  });
});
