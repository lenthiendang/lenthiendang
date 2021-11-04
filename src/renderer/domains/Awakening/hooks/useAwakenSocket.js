/* eslint-disable no-console */
import { useEffect, useContext } from 'react';

import { SocketContext } from '../../../socket';

// TESTING
const useSocket = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Response của server khi client đăng ký rắn
    socket.on('AWAKEN_REGISTER_RESPONSE', (data) => {
      console.log('AWAKEN_REGISTER_RESPONSE', data);
    });

    // #Testing: Thông tin rắn mỗi phiên
    socket.on('AWAKEN_INFO', (data) => {
      console.log('AWAKEN_INFO', data);
    });

    socket.on('disconnect', (info) => {
      console.log(info);
    });
    return () => socket.disconnect();
  }, [socket]);
};

export default useSocket;
