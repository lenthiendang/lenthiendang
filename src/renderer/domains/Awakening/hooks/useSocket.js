import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

// TESTING
const useSocket = () => {
  const socketRef = useRef();
  const { accessToken: token } = useSelector((store) => store.auth);

  // init
  useEffect(() => {
    socketRef.current = io(`localhost:3000`, {
      reconnectionDelayMax: 1e4,
      query: {
        token,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socketRef.current.emit('register', { Số_rắn_dăng_ký: 15 });
  }, [socketRef]);
};

export default useSocket;
