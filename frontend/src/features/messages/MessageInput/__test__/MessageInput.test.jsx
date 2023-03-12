import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testUtils';

import MessageInput from '..';

test('renders an input element', () => {
  renderWithProviders(<MessageInput />);
  expect(screen.getByLabelText('Write a new message here')).toBeInTheDocument();
});

test('renders a submit button', () => {
  renderWithProviders(<MessageInput />);
  expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
});
