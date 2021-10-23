import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkResult,
  selectRunning,
  setProfitResult,
  updatePatternList,
} from '../../redux/slices/awakeningSlice';
import RandomAwakening from './components/RandomAwakening';
import useSocket from './hooks/useSocket';

function MainLayout() {
  const dispatch = useDispatch();
  const candles = useSelector((state) => state.price.list);
  const isRunning = useSelector(selectRunning);

  useSocket();

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
      <RandomAwakening />
    </>
  );
}

export default React.memo(MainLayout);
