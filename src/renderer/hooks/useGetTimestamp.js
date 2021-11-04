import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'react-use';

import { toggleBetSession } from '../redux/slices/sessionSlice';
import { SocketContext } from '../socket';

const useGetTimestamp = () => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('BET_SESSION_INFO', (data) => {
      dispatch(toggleBetSession(data));
      setCounter(30);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useInterval(() => {
    if (counter !== null) {
      setCounter(counter - 1);
    }
  }, 1000);
  return counter;
};

export default useGetTimestamp;
