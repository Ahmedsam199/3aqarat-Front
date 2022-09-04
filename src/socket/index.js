import React, { useEffect, useRef } from 'react';
import Routes from '@Routes';
import { isUserLoggedIn } from '@utils';
import { io } from 'socket.io-client';
import Listener from './listener';
import Emit from './emit';
import { store } from '@store/storeConfig/store';
import { useSelector } from 'react-redux';

export const socket = io(Routes.Socket.data, {
  autoConnect: false,
});
export const statusSocket = (status) => {
  if (status) {
    socket.open();
  } else {
    socket.disconnect();
  }
};
const SocketProvider = () => {
  const {
    tempData: { network },
    auth:  {userData} ,
    // AccountInfo: { Series: AccountSeries },
  } = useSelector((state) => state);
  
  
  // * check status of network
  useEffect(() => {
    //! check first time if it's not  login
    if (!network || !isUserLoggedIn()) {
      statusSocket(0);
    } else {
      // * have network and login so connection
      // if (!socket.connected)
      statusSocket(1);
    }
  }, [network, socket.connected, userData]);
  // * add listener here and listener and socket when close app
  const ref = useRef(null);
  const join = () => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      Emit.join(userData.userSeries);
    }, 500);
  };
  useEffect(() => {
    if (!!socket.connected && !!userData.userSeries) join();
  }, [socket.connected, userData.userSeries]);
  useEffect(() => {
    Listener.Add(store.dispatch);
    Listener.Update(store.dispatch);
    Listener.Delete(store.dispatch);
    Listener.connect();
    Listener.disconnect();
    return () => {
      socket.close();
    };
  }, []);
  // * it's faked component so return null
  return null;
};

export default SocketProvider;
