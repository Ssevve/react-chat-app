import { screen } from '@testing-library/react';
import renderWithProviders from 'utils/testUtils';
import messagesMock from '__mocks__/messagesMock';

import Message from '..';

const ownMessage = messagesMock[0];
const friendMessage = messagesMock[1];

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
