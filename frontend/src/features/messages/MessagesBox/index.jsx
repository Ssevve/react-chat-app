import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentChat } from 'features/chats/chatsSlice';
import { selectMessagesByChatId } from 'features/messages/messagesSlice';
import { selectUser } from 'features/auth/authSlice';

import Message from 'features/messages/Message';
import MessageInput from '../MessageInput';
import User from 'features/users/User';

import { Section, CurrentChatInfo, Messages } from './styles';

function MessagesBox() {
  const currentChat = useSelector(selectCurrentChat);
  const loggedInUser = useSelector(selectUser);
  const [chatPartner, setChatPartner] = useState(null);
  const currentChatMessages = useSelector((state) =>
    selectMessagesByChatId(state, currentChat._id),
  );

  useEffect(() => {
    if (!currentChat) return;
    const partner = currentChat.members.find((member) => member._id !== loggedInUser._id);
    setChatPartner(partner);
  }, [currentChat, loggedInUser._id]);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [currentChatMessages, currentChat]);

  return (
    <Section>
      <CurrentChatInfo>
        <User user={chatPartner} />
      </CurrentChatInfo>
      {currentChatMessages.length ? (
        <>
          <Messages ref={scrollRef}>
            {currentChatMessages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
          </Messages>
        </>
      ) : null}
      <MessageInput />
    </Section>
  );
}

export default MessagesBox;
