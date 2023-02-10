import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentChat } from 'features/chats/chatsSlice';
import styled from 'styled-components/macro';
import breakpoints from 'utils/breakpoints';

import Message from 'features/messages/Message';
import MessageInput from './MessageInput';

const Section = styled.section`
  flex: 2.5;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: calc(100% - 4rem);
  top: 4rem;
  transition: all 0.1s ease-in-out;

  ${({ sidePanelExpanded }) =>
    sidePanelExpanded && {
      opacity: '0.5',
      filter: 'blur(0.1rem)',
    }};

  @media ${breakpoints.medium} {
    max-width: ${({ expandRightPanel }) =>
      expandRightPanel ? 'calc(100vw - 600px)' : 'calc(100vw - 300px)'};
    left: 300px;
    right: ${({ expandRightPanel }) => (expandRightPanel ? '300px' : '0')};
    transition: right 0.1s ease-in-out, max-width 0.1s ease-in-out;
  }

  @media ${breakpoints.large} {
    max-width: calc(100vw - 600px);
    right: 300px;
    transition: none;
  }
`;

const Messages = styled.section`
  padding: var(--padding);
  max-height: calc(100% - 4rem);
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 4rem;
  display: grid;
  align-content: flex-start;
  flex: 1;
  gap: 2rem;
  overflow-y: auto;
`;

function MessagesBox({ sidePanelExpanded, expandRightPanel }) {
  const currentChat = useSelector(selectCurrentChat);

  const currentChatMessages = useSelector((state) =>
    state.messages.messages.filter((message) => message.chatId === currentChat?._id),
  );
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [currentChatMessages, currentChat]);

  return (
    <Section sidePanelExpanded={sidePanelExpanded} expandRightPanel={expandRightPanel}>
      {currentChatMessages && (
        <>
          <Messages ref={scrollRef}>
            {currentChatMessages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
          </Messages>
          <MessageInput />
        </>
      )}
    </Section>
  );
}

export default MessagesBox;
