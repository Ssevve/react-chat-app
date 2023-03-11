import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '__mocks__/matchMediaMock';
import { renderWithProviders } from 'utils/testUtils';
import singleFriendInviteMock from '__mocks__/data/singleFriendInviteMock';
import multipleFriendInvitesMock from '__mocks__/data/multipleFriendInvitesMock';

import FriendInvites from '..';

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

test('renders only "cancel invite" button for sent friend invites', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
    friendInvites: { friendInvites: singleFriendInviteMock },
  };

  renderWithProviders(<FriendInvites />, { preloadedState });
  expect(screen.getByRole('button', { name: /cancel invite/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /accept invite/i })).not.toBeInTheDocument();
});

test('renders an "accept invite" and "cancel invite" buttons for received friend invites', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '2',
      },
    },
    friendInvites: { friendInvites: singleFriendInviteMock },
  };

  renderWithProviders(<FriendInvites />, { preloadedState });
  expect(screen.getByRole('button', { name: /cancel invite/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /accept invite/i })).toBeInTheDocument();
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
