import axios from 'axios';

const fetchFriendInvites = async (accessToken) => {
  try {
    const res = await axios.get(`/invites`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export default fetchFriendInvites;
