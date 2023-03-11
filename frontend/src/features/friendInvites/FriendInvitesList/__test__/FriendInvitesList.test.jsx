import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '__mocks__/matchMediaMock';
import { renderWithProviders } from 'utils/testUtils';
import singleFriendInviteMock from '__mocks__/data/singleFriendInviteMock';
import multipleFriendInvitesMock from '__mocks__/data/multipleFriendInvitesMock';

import FriendInvites from '..';

test('renders correct count for no friend invites', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
    friendInvites: { friendInvites: [] },
  };

  renderWithProviders(<FriendInvites />, { preloadedState });
  expect(screen.getByRole('heading')).toHaveTextContent('0');
});

test('renders correct count for one friend invite', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
    friendInvites: { friendInvites: singleFriendInviteMock },
  };

  renderWithProviders(<FriendInvites />, { preloadedState });
  expect(screen.getByRole('heading')).toHaveTextContent('1');
});

test('renders correct count for multiple invites', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
    friendInvites: { friendInvites: multipleFriendInvitesMock },
  };

  renderWithProviders(<FriendInvites />, { preloadedState });
  expect(screen.getByRole('heading')).toHaveTextContent('2');
});

test('renders a sent friend invite', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
    friendInvites: { friendInvites: singleFriendInviteMock },
  };

  renderWithProviders(<FriendInvites />, { preloadedState });
  expect(screen.getByText('InviteReceiver')).toBeInTheDocument();
});

test('renders a received friend invite', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '2',
      },
    },
    friendInvites: { friendInvites: singleFriendInviteMock },
  };

  renderWithProviders(<FriendInvites />, { preloadedState });
  expect(screen.getByText('InviteSender')).toBeInTheDocument();
});

test('renders multiple friend invites', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '2',
      },
    },
    friendInvites: { friendInvites: multipleFriendInvitesMock },
  };

  renderWithProviders(<FriendInvites />, { preloadedState });
  expect(screen.getByText('FirstInviteSender')).toBeInTheDocument();
  expect(screen.getByText('SecondInviteReceiver')).toBeInTheDocument();
});
