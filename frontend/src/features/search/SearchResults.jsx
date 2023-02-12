import styled from 'styled-components/macro';
import { IoMdAdd } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccessToken } from 'features/auth/authSlice';
import { createFriendInvite } from 'features/friends/friendsSlice';

import { ReactComponent as Loader } from 'assets/loader.svg';
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

const StyledLoader = styled(Loader)`
  width: 100%;
  height: 2rem;
`;

function SearchResults({ loading, results }) {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  const handleClick = async (resultId) => {
    dispatch(createFriendInvite({ friendId: resultId, accessToken }));
  };

  const resultsReady = results.length && !loading;

  return (
    <Results>
      {loading ? <StyledLoader stroke="var(--clr-light-200)" /> : null}
      {resultsReady
        ? results.map((result) => (
            <Result key={result._id}>
              <User events={false} user={result} />
              <InviteButton type="button" onClick={() => handleClick(result._id)}>
                <IoMdAdd size="1.5rem" />
              </InviteButton>
            </Result>
          ))
        : null}
    </Results>
  );
}

export default SearchResults;
