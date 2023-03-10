const singleChatMock = [
  {
    _id: '1',
    members: [
      {
        _id: '2',
        username: 'TestUser',
        avatar: {
          url: '',
        },
      },
      {
        _id: '3',
        username: 'TestUser2',
        avatar: {
          url: '',
        },
      },
    ],
    updatedAt: Date.now().toString(),
    lastMessage: {
      id: '4',
      content: 'Test message',
      sender: '2',
      createdAt: Date.now(),
    },
  },
];

export default singleChatMock;
