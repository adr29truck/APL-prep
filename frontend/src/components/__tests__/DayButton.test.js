import { render, screen } from '@testing-library/react';
import { DayButton } from '../DayButton';

const obj = {
  name: 'Test',
  id: 1,
  label: 'Test Label'
}
test('renders correct label', () => {
  render(<DayButton object={obj} />);
  const linkElement = screen.getByText(obj.label);
  expect(linkElement).toBeInTheDocument();
});
