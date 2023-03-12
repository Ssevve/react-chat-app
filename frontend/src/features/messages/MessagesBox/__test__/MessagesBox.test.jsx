import { screen } from '@testing-library/react';
import currentChatMock from '__mocks__/data/currentChatMock';
import messagesMock from '__mocks__/data/messagesMock';
import { renderWithProviders } from 'utils/testUtils';

import MessagesBox from '..';

const preloadedState = {
  chats: {
    currentChat: currentChatMock,
  },
  messages: {
    messages: messagesMock,
  },
  auth: {
    user: {
      _id: '2',
    },
  },
};

test("renders chat partner's avatar", () => {
  renderWithProviders(<MessagesBox />, { preloadedState });
  expect(screen.getByAltText('CurrentChatPartner')).toBeInTheDocument();
});

test("renders chat partner's username", () => {
  renderWithProviders(<MessagesBox />, { preloadedState });
  expect(screen.getByText('CurrentChatPartner')).toBeInTheDocument();
});

test('renders messages from the current chat', () => {
  renderWithProviders(<MessagesBox />, { preloadedState });
  expect(screen.getByText('Own message')).toBeInTheDocument();
  expect(screen.getByText("Friend's message")).toBeInTheDocument();
  expect(screen.queryByText('Own message from a different chat')).not.toBeInTheDocument();
});

test('renders message input component', () => {
  renderWithProviders(<MessagesBox />, { preloadedState });
  expect(screen.getByLabelText(/new message/i)).toBeInTheDocument();
});
