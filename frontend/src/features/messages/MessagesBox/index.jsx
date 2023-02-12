import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentChat } from 'features/chats/chatsSlice';

import Message from 'features/messages/Message';
import MessageInput from '../MessageInput';

import { Section, Messages } from './styles';

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
