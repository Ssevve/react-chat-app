import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '__mocks__/matchMediaMock';
import { renderWithProviders } from 'utils/testUtils';
import singleChatMock from '__mocks__/data/singleChatMock';
import multipleChatsMock from '__mocks__/data/multipleChatsMock';

import ChatsList from '..';

test('renders single chat', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
    chats: { chats: singleChatMock },
  };

  renderWithProviders(<ChatsList />, { preloadedState });
  expect(screen.getByText('Test message')).toBeInTheDocument();
});

test('renders multiple chats', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
    chats: { chats: multipleChatsMock },
  };

  renderWithProviders(<ChatsList />, { preloadedState });
  expect(screen.getByText('First test message')).toBeInTheDocument();
  expect(screen.getByText('Second test message')).toBeInTheDocument();
});
