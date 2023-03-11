import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '__mocks__/matchMediaMock';
import { renderWithProviders } from 'utils/testUtils';

import FriendsList from '..';

const friendsMock = {
  friends: {
    ids: ['1', '2', '3'],
    entities: {
      1: {
        _id: '1',
        username: 'FirstTestFriend',
        avatar: {
          url: '',
        },
      },
      2: {
        _id: '2',
        username: 'SecondTestFriend',
        avatar: {
          url: '',
        },
      },
      3: {
        _id: '3',
        username: 'ThirdTestFriend',
        avatar: {
          url: '',
        },
      },
    },
  },
};

test('renders online friends', () => {
  renderWithProviders(<FriendsList />, {
    preloadedState: {
      ...friendsMock,
      users: {
        connectedUsers: { 1: 'socketId', 3: 'socketId3' },
      },
    },
  });
  expect(screen.getByText('FirstTestFriend')).toBeInTheDocument();
  expect(screen.getByText('ThirdTestFriend')).toBeInTheDocument();
});

test('renders correct count for no online friends', () => {
  renderWithProviders(<FriendsList />, {
    preloadedState: {
      ...friendsMock,
      users: {
        connectedUsers: {},
      },
    },
  });
  expect(screen.getByRole('heading', { name: /online/i })).toHaveTextContent('0');
});

test('renders correct count for one online friend', () => {
  renderWithProviders(<FriendsList />, {
    preloadedState: {
      ...friendsMock,
      users: {
        connectedUsers: { 1: 'socketId' },
      },
    },
  });
  expect(screen.getByRole('heading', { name: /online/i })).toHaveTextContent('1');
});

test('renders correct count for multiple online friends', () => {
  renderWithProviders(<FriendsList />, {
    preloadedState: {
      ...friendsMock,
      users: {
        connectedUsers: { 1: 'socketId', 2: 'socketId2' },
      },
    },
  });
  expect(screen.getByRole('heading', { name: /online/i })).toHaveTextContent('2');
});

test('renders offline friends', () => {
  renderWithProviders(<FriendsList />, {
    preloadedState: {
      ...friendsMock,
      users: {
        connectedUsers: {},
      },
    },
  });
  expect(screen.getByText('FirstTestFriend')).toBeInTheDocument();
  expect(screen.getByText('SecondTestFriend')).toBeInTheDocument();
  expect(screen.getByText('ThirdTestFriend')).toBeInTheDocument();
});

test('renders correct count for no offline friends', () => {
  renderWithProviders(<FriendsList />, {
    preloadedState: {
      ...friendsMock,
      users: {
        connectedUsers: { 1: 'socketId', 2: 'socketId2', 3: 'socketId3' },
      },
    },
  });
  expect(screen.getByRole('heading', { name: /offline/i })).toHaveTextContent('0');
});

test('renders correct count for one offline friend', () => {
  renderWithProviders(<FriendsList />, {
    preloadedState: {
      ...friendsMock,
      users: {
        connectedUsers: { 1: 'socketId', 2: 'socketId2' },
      },
    },
  });
  expect(screen.getByRole('heading', { name: /offline/i })).toHaveTextContent('1');
});

test('renders correct count for multiple offline friends', () => {
  renderWithProviders(<FriendsList />, {
    preloadedState: {
      ...friendsMock,
      users: {
        connectedUsers: { 1: 'socketId' },
      },
    },
  });
  expect(screen.getByRole('heading', { name: /offline/i })).toHaveTextContent('2');
});
