const chatsMock = [
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
      content: 'First test message',
      sender: '2',
      createdAt: Date.now(),
    },
  },
  {
    _id: '5',
    members: [
      {
        _id: '3',
        username: 'TestUser',
        avatar: {
          url: '',
        },
      },
      {
        _id: '7',
        username: 'TestUser2',
        avatar: {
          url: '',
        },
      },
    ],
    updatedAt: Date.now().toString(),
    lastMessage: {
      id: '8',
      content: 'Second test message',
      sender: '7',
      createdAt: Date.now(),
    },
  },
];

export default chatsMock;
