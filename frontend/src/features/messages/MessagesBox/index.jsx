import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentChat } from 'features/chats/chatsSlice';
import { fetchMessages } from 'features/messages/messagesSlice';

import Message from 'features/messages/Message';
import MessageInput from '../MessageInput';

import { Section, Messages } from './styles';

function MessagesBox({ sidePanelExpanded, expandRightPanel }) {
  const dispatch = useDispatch();
  const currentChat = useSelector(selectCurrentChat);
  const auth = useSelector((state) => state.auth);

  const currentChatMessages = useSelector((state) =>
    state.messages.messages.filter((message) => message.chatId === currentChat?._id),
  );
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages({ userId: auth.user._id, accessToken: auth.accessToken }));
  }, []);

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
