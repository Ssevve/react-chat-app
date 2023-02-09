import styled from 'styled-components/macro';
import { IoMdAdd } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccessToken } from 'features/auth/authSlice';
import { createFriendInvite } from 'features/friends/friendsSlice';

import User from 'components/common/User';

const Results = styled.ul`
  overflow: hidden;
`;

const Result = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InviteButton = styled.button`
  color: var(--clr-accent);
  border: 1px solid currentColor;
  margin-right: var(--padding);
  background: none;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  padding: 0.15rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background: var(--hover-accent);
  }
`;

function SearchResults({ results }) {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const handleClick = async (resultId) => {
    dispatch(createFriendInvite({ friendId: resultId, accessToken }));
  };

  return (
    <Results>
      {results &&
        results.map((result) => (
          <Result key={result._id}>
            <User events={false} user={result} />
            <InviteButton type="button" onClick={() => handleClick(result._id)}>
              <IoMdAdd size="1.5rem" />
            </InviteButton>
          </Result>
        ))}
    </Results>
  );
}

export default SearchResults;
