import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkResult,
  setProfitResult,
  startBet,
  updateAutoParoliPatternList,
  updatePatternList,
} from '../../../redux/slices/awakeningSlice';
import RandomAwakening from './RandomAwakening';

function MainLayout() {
  const dispatch = useDispatch();
  const candles = useSelector((state) => state.price.list);
  const patternList = useSelector((state) => state.awakening.patternList);
  const isRunning = patternList.some((pattern) => pattern.isActive === true);

  useEffect(() => {
    dispatch(updatePatternList());
  }, [dispatch]);

  useEffect(() => {
    if (isRunning) {
      dispatch(setProfitResult(0));
    }
  }, [dispatch, isRunning]);

  useEffect(() => {
    if (candles && candles.length > 0) {
      dispatch(checkResult());
      dispatch(updateAutoParoliPatternList());
      dispatch(startBet());
    }
  }, [dispatch, candles]);

  return (
    <>
      <RandomAwakening />
    </>
  );
}

export default React.memo(MainLayout);
