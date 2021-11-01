import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkResult,
  setProfitResult,
  updatePatternList,
} from '../../redux/slices/awakeningSlice';
import RandomAwakening from './components/RandomAwakening';
import TestAwaken from './testing';
import useAwakenSocket from './hooks/useAwakenSocket';

function MainLayout() {
  const dispatch = useDispatch();
  const candles = useSelector((state) => state.price.list);
  const patternList = useSelector((state) => state.awakening.patternList);
  const isRunning = patternList.some((pattern) => pattern.isActive === true);

  useAwakenSocket();

  useEffect(() => {
    dispatch(updatePatternList());
  }, [dispatch]);

  useEffect(() => {
    if (isRunning) {
      dispatch(setProfitResult(0));
    }
  }, [dispatch, isRunning]);

  useEffect(() => {
    if (isRunning) {
      dispatch(checkResult());
    }
  }, [dispatch, isRunning, candles]);

  return (
    <>
      <TestAwaken />
      <RandomAwakening />
    </>
  );
}

export default React.memo(MainLayout);
