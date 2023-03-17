import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/testUtils';
import chatsMock from '__mocks__/chatsMock';

import Chat from '..';

const preloadedState = {
  auth: {
    user: {
      _id: '3',
    },
  },
};

const testChat = chatsMock[0];

test('renders an avatar of a chat partner', () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByAltText('TestUser')).toBeInTheDocument();
});

test('renders a username of a chat partner', () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByText('TestUser')).toBeInTheDocument();
});

test("renders last message's content", () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByText('First test message')).toBeInTheDocument();
});

test('renders the time passed from the last message', () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByText('just now')).toBeInTheDocument();
});
