import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentChat } from 'features/chats/chatsSlice';
import { fetchMessages } from 'features/messages/messagesSlice';
import { selectUser } from 'features/auth/authSlice';

import Message from 'features/messages/Message';
import MessageInput from '../MessageInput';
import User from 'components/common/User';

import { Section, CurrentChatInfo, Messages } from './styles';

function MessagesBox({ sidePanelExpanded, expandRightPanel }) {
  const dispatch = useDispatch();
  const currentChat = useSelector(selectCurrentChat);
  const loggedInUser = useSelector(selectUser);
  const [chatPartner, setChatPartner] = useState(null);

  useEffect(() => {
    if (!currentChat) return;
    const partner = currentChat.members.find((member) => member._id !== loggedInUser._id);
    setChatPartner(partner);
  }, [currentChat, loggedInUser._id]);

  const currentChatMessages = useSelector((state) =>
    state.messages.messages.filter((message) => message.chatId === currentChat?._id),
  );
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages(loggedInUser._id));
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [currentChatMessages, currentChat]);

  return (
    <Section sidePanelExpanded={sidePanelExpanded} expandRightPanel={expandRightPanel}>
      <CurrentChatInfo>
        <User user={chatPartner} events={false} />
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
