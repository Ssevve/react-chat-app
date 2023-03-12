import { screen } from '@testing-library/react';
import { renderWithProviders } from 'utils/testUtils';
import friendInvitesMock from '__mocks__/data/friendInvitesMock';

import FriendInvite from '..';

const invite = friendInvitesMock[0];

test("renders invited user's avatar", () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
  };
  renderWithProviders(<FriendInvite invite={invite} />, { preloadedState });
  expect(screen.getByAltText('FirstInviteReceiver')).toBeInTheDocument();
});

test("renders invited user's username", () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
  };
  renderWithProviders(<FriendInvite invite={invite} />, { preloadedState });
  expect(screen.getByText('FirstInviteReceiver')).toBeInTheDocument();
});

test('renders only "cancel invite" button for sent friend invites', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '3',
      },
    },
  };

  renderWithProviders(<FriendInvite invite={invite} />, { preloadedState });
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
  renderWithProviders(<FriendInvite invite={invite} />, { preloadedState });
  expect(screen.getByAltText('FirstInviteSender')).toBeInTheDocument();
});

test("renders inviting user's username", () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '2',
      },
    },
  };
  renderWithProviders(<FriendInvite invite={invite} />, { preloadedState });
  expect(screen.getByText('FirstInviteSender')).toBeInTheDocument();
});

test('renders an "accept invite" and "cancel invite" buttons for received friend invites', () => {
  const preloadedState = {
    auth: {
      user: {
        _id: '2',
      },
    },
  };

  renderWithProviders(<FriendInvite invite={invite} />, { preloadedState });
  expect(screen.getByRole('button', { name: /cancel invite/i })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /accept invite/i })).toBeInTheDocument();
});
