import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '__mocks__/matchMediaMock';
import { renderWithProviders } from 'utils/testUtils';

import MessageInput from '..';

// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: jest.fn(jest.fn(() => ({ payload: { updatedChat: null } }))),
// }));

// const server = setupServer(
//   rest.post('/messages', (req, res, ctx) => {
//     // respond using a mocked JSON body
//     return res(
//       ctx.json({
//         payload: {
//           updatedChat: {
//             _id: '1',
//             members: ['2', '3'],
//           },
//         },
//       }),
//     );
//   }),
// );

// beforeAll(() =>
//   jest.mock('react-redux', () => ({
//     useSelector: jest.fn(),
//     useDispatch: jest.fn().mockReturnValue({ payload: { updatedChat: null } }),
//   })),
// );
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

const initialChats = {
  chats: [
    {
      _id: '1',
      members: ['2', '3'],
    },
  ],
  currentChat: {
    _id: '1',
    members: ['2', '3'],
  },
};

const initialAuth = {
  user: {
    _id: '2',
  },
};

test('renders an input element', () => {
  renderWithProviders(<MessageInput />);
  expect(screen.getByLabelText('Write a new message here')).toBeInTheDocument();
});

test('renders a submit button', () => {
  renderWithProviders(<MessageInput />);
  expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
});

// test('clears the message input on the submit button click', async () => {
//   const user = userEvent.setup();
//   renderWithProviders(<MessageInput />, {
//     preloadedState: {
//       chats: initialChats,
//       auth: initialAuth,
//     },
//   });

//   const input = screen.getByLabelText('Write a new message here');

//   await user.type(input, 'Test');
//   await user.click(screen.getByRole('button', { name: /send message/i }));
//   await waitFor(() => expect(input).toHaveValue(''));
// });
