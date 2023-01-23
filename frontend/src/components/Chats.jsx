import styled from 'styled-components';

import Chat from './Chat';
import DropdownList from './DropdownList';

const Wrapper = styled.section`
  margin-top: 1rem;
`;

function Chats({ chats, currentChat, setCurrentChat }) {
  return (
    <Wrapper>
      <DropdownList title="Direct messages">
        {chats.map((chat) => (
          <Chat
            key={chat._id}
            chat={chat}
            currentChat={currentChat}
            onClick={() => setCurrentChat(chat)}
          />
        ))}
      </DropdownList>
    </Wrapper>
  );
}

export default Chats;
