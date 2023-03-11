import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '__mocks__/matchMediaMock';
import { renderWithProviders } from 'utils/testUtils';
import singleChatMock from '__mocks__/data/singlechatMock';

import Chat from '..';

const preloadedState = {
  auth: {
    user: {
      _id: '3',
    },
  },
};

const testChat = singleChatMock[0];

test('renders an avatar of a chat partner', () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByAltText('TestUser')).toBeInTheDocument();
});

test('renders a username of a chat partner', () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByText('TestUser')).toBeInTheDocument();
});

test("renders last message's content", () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByText('Test message')).toBeInTheDocument();
});

test('renders the time passed from the last message', () => {
  renderWithProviders(<Chat chat={testChat} />, { preloadedState });
  expect(screen.getByText('just now')).toBeInTheDocument();
});
