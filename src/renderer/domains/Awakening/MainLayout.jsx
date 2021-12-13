import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkResult,
  deleteCommonParoliPattern,
  setProfitResult,
  updatePatternList,
} from '../../redux/slices/awakeningSlice';
import { SocketContext } from '../../socket';
import { PATTERN_TYPE } from './awakeningUtil';
import RandomAwakening from './components/RandomAwakening';
import useAwakenSocket from './hooks/useAwakenSocket';

function MainLayout() {
  const dispatch = useDispatch();
  const candles = useSelector((state) => state.price.list);
  const {
    patternList,
    roomList,
    commonParoliRunning,
    commonParoliFunds,
  } = useSelector((state) => state.awakening);
  const isRunning = patternList.some((pattern) => pattern.isActive === true);
  const socket = useContext(SocketContext);

  const reduxRoomList = roomList.map(({ roomId }) => roomId) || []
  const patternRooms = patternList.filter(
    (pattern) => pattern.type === PATTERN_TYPE.COMMON_PAROLI
  ).map(({ roomId }) => roomId) || [];
  const roomMatching = patternRooms.every(
    (roomId) => reduxRoomList.includes(roomId)
  )

  useAwakenSocket();

  useEffect(() => {
    dispatch(deleteCommonParoliPattern('ALL'));
  }, [dispatch]);

  useEffect(() => {
    console.log('updatePatternList');
    socket.emit('AWAKEN_UNREGISTER');
    dispatch(updatePatternList());
  }, [dispatch]);

  useEffect(() => {
    if (isRunning) {
      dispatch(setProfitResult(0));
    }
  }, [dispatch, isRunning]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(checkResult());
      clearTimeout(timeoutId);
    }, 1500);
  }, [dispatch, candles]);

  // re-register when the rooms do not match
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        commonParoliRunning
        && patternRooms.length > 0
        && reduxRoomList.length > 0
        && !roomMatching
      ) {
        socket.emit('AWAKEN_UNREGISTER');
        const patternAmount = Math.floor(commonParoliFunds);
        socket.emit('AWAKEN_REGISTER', patternAmount);
      }
      clearTimeout(timeoutId);
    }, 3000);
  }, [candles]);

  return (
    <>
      {/* <TestAwaken /> */}
      <RandomAwakening />
    </>
  );
}

export default MainLayout;
