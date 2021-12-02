import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkResult,
  deleteCommonParoliPattern,
  setProfitResult,
  updatePatternList,
} from '../../redux/slices/awakeningSlice';
import { SocketContext } from '../../socket';
import RandomAwakening from './components/RandomAwakening';
import TestAwaken from './testing';
import useAwakenSocket from './hooks/useAwakenSocket';

function MainLayout() {
  const dispatch = useDispatch();
  const candles = useSelector((state) => state.price.list);
  const patternList = useSelector((state) => state.awakening.patternList);
  const isRunning = patternList.some((pattern) => pattern.isActive === true);
  const socket = useContext(SocketContext);

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

  return (
    <>
      {/* <TestAwaken /> */}
      <RandomAwakening />
    </>
  );
}

export default MainLayout;
