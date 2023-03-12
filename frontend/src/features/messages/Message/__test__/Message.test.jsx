import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '__mocks__/matchMediaMock';
import { renderWithProviders } from 'utils/testUtils';

import Message from '..';

const ownMessage = {
  _id: '1',
  sender: {
    _id: '2',
    username: 'Test',
    avatar: {
      url: '',
    },
  },
  content: 'Own message',
};

const friendMessage = {
  _id: '1',
  sender: {
    _id: '3',
    username: 'Friend',
    avatar: {
      url: '',
    },
  },
  content: "Friend's message",
  createdAt: Date.now().toString(),
};

const preloadedState = {
  auth: {
    user: {
      _id: '2',
    },
  },
};

test('renders an avatar', () => {
  renderWithProviders(<Message message={friendMessage} />, { preloadedState });
  expect(screen.getByAltText('Friend')).toBeInTheDocument();
});

test('renders a username for not own messages', () => {
  renderWithProviders(<Message message={friendMessage} />, { preloadedState });
  expect(screen.getByText('Friend')).toBeInTheDocument();
});

test('renders "You" for own messages', () => {
  renderWithProviders(<Message message={ownMessage} />, { preloadedState });
  expect(screen.getByText('You')).toBeInTheDocument();
});

test('renders time elapsed', () => {
  renderWithProviders(<Message message={friendMessage} />, { preloadedState });
  expect(screen.getByText('just now')).toBeInTheDocument();
});

test('renders message content', () => {
  renderWithProviders(<Message message={friendMessage} />, { preloadedState });
  expect(screen.getByText("Friend's message")).toBeInTheDocument();
});
