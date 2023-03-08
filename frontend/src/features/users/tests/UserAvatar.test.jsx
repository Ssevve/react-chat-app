import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { renderWithProviders } from 'utils/testUtils';

import UserAvatar from '../UserAvatar';
import avatarPlaceholder from 'assets/no-avatar.jpg';

const testUser = {
  username: 'Test',
  avatar: {
    url: '',
  },
};

test('renders an avatar placeholder if the user has no avatar', () => {
  renderWithProviders(<UserAvatar user={testUser} />);
  const avatar = screen.getByAltText('Test');
  expect(avatar.src).toContain(avatarPlaceholder);
});

test('renders an avatar without connection status by default', () => {
  renderWithProviders(<UserAvatar user={testUser} />);
  const connectionStatus = screen.queryByTestId('conn');
  expect(connectionStatus).not.toBeInTheDocument();
});

test('renders an avatar with connection status if specified', () => {
  renderWithProviders(<UserAvatar user={testUser} showConnectionStatus />);
  const connectionStatus = screen.getByRole('note');
  expect(connectionStatus).toBeInTheDocument();
});
