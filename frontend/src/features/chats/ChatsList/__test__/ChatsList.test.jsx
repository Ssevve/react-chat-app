import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '__mocks__/matchMediaMock';
import { renderWithProviders } from 'utils/testUtils';
import authMock from '__mocks__/authMock';
import singleChatMock from '__mocks__/singleChatMock';
import multipleChatsMock from '__mocks__/multipleChatsMock';

import ChatsList from '..';

test('renders single chat', () => {
  const preloadedState = {
    auth: authMock,
    chats: { chats: singleChatMock },
  };

  renderWithProviders(<ChatsList />, { preloadedState });
  expect(screen.getByText('Test message')).toBeInTheDocument();
});

test('renders multiple chats', () => {
  const preloadedState = {
    auth: authMock,
    chats: { chats: multipleChatsMock },
  };

  renderWithProviders(<ChatsList />, { preloadedState });
  expect(screen.getByText('First test message')).toBeInTheDocument();
  expect(screen.getByText('Second test message')).toBeInTheDocument();
});
