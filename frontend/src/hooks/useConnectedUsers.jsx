import { useContext } from 'react';
import { ConnectedUsersContext } from '../context/ConnectedUsersContext';

const useConnectedUsers = () => useContext(ConnectedUsersContext);

export default useConnectedUsers;
