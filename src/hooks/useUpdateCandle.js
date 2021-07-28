import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCandles } from '../redux/slices/priceSlice';

const useUpdateCandle = () => {
  const dispatch = useDispatch();
  const { isBetSession } = useSelector((state) => state.session);

  // update candles if isBetSession is true
  useEffect(() => {
    if (isBetSession) {
      dispatch(updateCandles());
    }
  }, [dispatch, isBetSession]);
};

export default useUpdateCandle;
