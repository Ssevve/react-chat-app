import { useContext } from 'react';
import { ChatsContext } from '../context/ChatsContext';

const useChats = () => useContext(ChatsContext);

export default useChats;
