import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '__mocks__/matchMediaMock';
import { renderWithProviders } from 'utils/testUtils';

import Chat from '..';

const testChat = {
  _id: '1',
  members: [
    {
      _id: '2',
      username: 'TestUser',
      avatar: {
        url: '',
      },
    },
    {
      _id: '3',
      username: 'TestUser2',
      avatar: {
        url: '',
      },
    },
  ],
  lastMessage: {
    id: '4',
    content: 'Hello',
    sender: '2',
    createdAt: Date.now(),
  },
};

const preloadedState = {
  auth: {
    user: { _id: '2' },
  },
};

test('renders an avatar of a chat partner', () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByAltText('TestUser2')).toBeInTheDocument();
});

test('renders a username of a chat partner', () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByText('TestUser2')).toBeInTheDocument();
});

test('renders last messages content', () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByText('Hello')).toBeInTheDocument();
});

test('renders the time passed from the last message', () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByText('just now')).toBeInTheDocument();
});
