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
    // Số_rắn_dăng_ký
    socketRef.current.emit('register', { paroli_register_amount: 1 });
  }, [socketRef]);
};

export default useSocket;
