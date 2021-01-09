import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

test('renders correct Header title', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Timeline/i);
  expect(linkElement).toBeInTheDocument();
});
