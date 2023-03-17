import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/testUtils';
import chatsMock from '__mocks__/chatsMock';

import ChatsList from '..';

test('renders single chat', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
    chats: { chats: [chatsMock[0]] },
  };

  renderWithProviders(<ChatsList />, { preloadedState });
  expect(screen.getByText('First test message')).toBeInTheDocument();
});

test('renders multiple chats', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
    chats: { chats: chatsMock },
  };

  renderWithProviders(<ChatsList />, { preloadedState });
  expect(screen.getByText('First test message')).toBeInTheDocument();
  expect(screen.getByText('Second test message')).toBeInTheDocument();
});
