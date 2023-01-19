import axios from 'axios';
import { RxTriangleDown } from 'react-icons/rx';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { AuthContext } from '../context/AuthContext';

import Chat from './Chat';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: var(--padding);
`;

const Button = styled.button`
  text-align: left;
  padding: var(--padding);
  padding-left: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  background: none;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
`;

const Arrow = styled.span`
  display: flex;
  justify-content: flex-start;
  transition: transform 0.1s ease-in-out;
  transform: ${({ expandChats }) => (expandChats ? 'rotate(0deg)' : 'rotate(-90deg)')};
`;

const Section = styled.section`
  max-height: ${({ expandChats }) => (expandChats ? '100%' : '0')};
  overflow: hidden;
  transition: max-height 0.1s ease-in-out;
`;

function Chats() {
  const { auth } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [expandChats, setExpandChats] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get('/chats', {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        });
        // console.log(res.data);
        setChats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, []); // Add messages to dependency array at take them as a prop, or use context

  return (
    <Wrapper>
      <Button onClick={() => setExpandChats((prev) => !prev)}>
        <Arrow expandChats={expandChats}>
          <RxTriangleDown size="1.5rem" />
        </Arrow>
        Direct Messages
      </Button>
      <Section expandChats={expandChats}>
        {chats.map((chat) => (
          <Chat key={chat._id} chat={chat} />
        ))}
      </Section>
    </Wrapper>
  );
}

export default Chats;
