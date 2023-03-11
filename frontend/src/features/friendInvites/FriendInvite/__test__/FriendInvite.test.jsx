import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '__mocks__/matchMediaMock';
import { renderWithProviders } from 'utils/testUtils';
import singleFriendInviteMock from '__mocks__/data/singleFriendInviteMock';

import FriendInvite from '..';

test("renders invited user's avatar", () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
  };
  renderWithProviders(<FriendInvite invite={singleFriendInviteMock[0]} />, { preloadedState });
  expect(screen.getByAltText('InviteReceiver')).toBeInTheDocument();
});

test("renders invited user's username", () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
  };
  renderWithProviders(<FriendInvite invite={singleFriendInviteMock[0]} />, { preloadedState });
  expect(screen.getByText('InviteReceiver')).toBeInTheDocument();
});

test('renders only "cancel invite" button for sent friend invites', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
  };

  renderWithProviders(<FriendInvite invite={singleFriendInviteMock[0]} />, { preloadedState });
  expect(screen.getByRole('button', { name: /cancel invite/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /accept invite/i })).not.toBeInTheDocument();
});

test("renders inviting user's avatar", () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '2',
      },
    },
  };
  renderWithProviders(<FriendInvite invite={singleFriendInviteMock[0]} />, { preloadedState });
  expect(screen.getByAltText('InviteSender')).toBeInTheDocument();
});

test("renders inviting user's username", () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '2',
      },
    },
  };
  renderWithProviders(<FriendInvite invite={singleFriendInviteMock[0]} />, { preloadedState });
  expect(screen.getByText('InviteSender')).toBeInTheDocument();
});

test('renders an "accept invite" and "cancel invite" buttons for received friend invites', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '2',
      },
    },
  };

  renderWithProviders(<FriendInvite invite={singleFriendInviteMock[0]} />, { preloadedState });
  expect(screen.getByRole('button', { name: /cancel invite/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /accept invite/i })).toBeInTheDocument();
});
