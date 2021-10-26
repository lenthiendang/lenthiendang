/* eslint-disable no-console */
import { useEffect, useContext } from 'react';

import { SocketContext } from '../../../socket';

// TESTING
const useSocket = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Response của server khi client đăng ký rắn
    socket.current.on('AWAKEN_REGISTER_RESPONSE', (data) => {
      console.log('AWAKEN_REGISTER_RESPONSE', data);
    });

    // Response của server khi client KHÁC đăng ký rắn
    socket.current.on('AWAKEN_PARTICIPANTS', (data) => {
      console.log('AWAKEN_PARTICIPANTS', data);
    });

    // #Testing: Thông tin đăng ký rắn
    socket.current.on('AWAKEN_INFO', (data) => {
      console.log('AWAKEN_INFO', data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useSocket;
