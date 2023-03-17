const messagesMock = [
  {
    _id: '1',
    sender: {
      _id: '2',
      username: 'Test',
      avatar: {
        url: '',
      },
    },
    chatId: '1',
    content: 'Own message',
    createdAt: Date.now().toString(),
  },
  {
    _id: '4',
    sender: {
      _id: '3',
      username: 'Friend',
      avatar: {
        url: '',
      },
    },
    chatId: '1',
    content: "Friend's message",
    createdAt: Date.now().toString(),
  },
  {
    _id: '5',
    sender: {
      _id: '2',
      username: 'Me',
      avatar: {
        url: '',
      },
    },
    chatId: '2',
    content: 'Own message from a different chat',
    createdAt: Date.now().toString(),
  },
];

export default messagesMock;
