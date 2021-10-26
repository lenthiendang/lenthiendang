import { createContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const useSocket = () => {
  const socketRef = useRef();
  const { accessToken: token } = useSelector((store) => store.auth);

  // init
  useEffect(() => {
    socketRef.current = io(process.env.SOCKET_URL, {
      reconnectionDelayMax: 1e4,
      query: {
        token,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return socketRef;
};

export default useSocket;
