import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/testUtils';

import Friend from '..';

const testFriend = {
  username: 'Friend',
  avatar: {
    url: '',
  },
};

test("renders friend's avatar", () => {
  renderWithProviders(<Friend friend={testFriend} />);
  expect(screen.getByAltText('Friend')).toBeInTheDocument();
});

test("renders friend's connection status", () => {
  renderWithProviders(<Friend friend={testFriend} />);
  expect(screen.getByRole('note')).toBeInTheDocument();
});

test("renders friend's username", () => {
  renderWithProviders(<Friend friend={testFriend} />);
  expect(screen.getByText('Friend')).toBeInTheDocument();
});

test('renders "send message" button', () => {
  renderWithProviders(<Friend friend={testFriend} />);

  const regex = new RegExp(`message ${testFriend.username}`, 'i');

  expect(screen.getByRole('button', { name: regex })).toBeInTheDocument();
});

test('renders "remove friend" button', () => {
  renderWithProviders(<Friend friend={testFriend} />);

  const regex = new RegExp(`remove ${testFriend.username}`, 'i');

  expect(screen.getByRole('button', { name: regex })).toBeInTheDocument();
});
