import { useInterval } from 'react-use';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

import { toggleBetSession } from '../redux/slices/sessionSlice';

const useGetTimestamp = () => {
  const {
    auth: { uid, accessToken },
    session: { isBetSession },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const [counter, setCounter] = useState(null);
  const exchangeSocketRef = useRef();

  // init
  useEffect(() => {
    if (uid && accessToken) {
      exchangeSocketRef.current = io(`https://ws.${process.env.DOMAIN}`, {
        reconnectionDelayMax: 1e4,
        query: {
          uid,
          ssid: accessToken,
        },
      });

      exchangeSocketRef.current.emit('BO_PRICE_SUBSCRIBE', null);
    }
  }, [accessToken, uid]);

  useEffect(() => {
    if (uid && accessToken) {
      exchangeSocketRef.current.on('BO_PRICE', (data) => {
        if (data) {
          setCounter(data.order);
          // add a condition to prevent redux dev tool from polluting logs
          if (data.isBetSession !== isBetSession) {
            dispatch(toggleBetSession(data.isBetSession));
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, uid]);

  return counter;
};

export const useGetTimestampDump = () => {
  // const dispatch = useDispatch();

  useInterval(() => {
    // dispatch(getTimestamp());
  }, 1000);
};

export default useGetTimestamp;
