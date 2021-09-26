import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAuto } from '../redux/slices/accountSlice';

const useRiskManagement = () => {
  const { takeProfitPoint, stopLossPoint, profit } = useSelector(
    (store) => store.account
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      (takeProfitPoint && profit >= takeProfitPoint) ||
      (stopLossPoint && profit <= stopLossPoint)
    ) {
      dispatch(setAuto(false));
    }
  }, [dispatch, profit, stopLossPoint, takeProfitPoint]);
};

export default useRiskManagement;
