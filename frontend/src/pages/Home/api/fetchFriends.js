import axios from 'axios';

const fetchFriends = async (accessToken, userId) => {
  try {
    const res = await axios.get(`/users/friends/${userId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export default fetchFriends;
