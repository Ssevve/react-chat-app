import axios from 'axios';

const fetchMessages = async (accessToken) => {
  try {
    const res = await axios.get(`/messages/chats`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export default fetchMessages;
