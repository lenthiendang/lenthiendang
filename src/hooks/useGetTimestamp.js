import { useInterval } from 'react-use';
import { useDispatch } from 'react-redux';

import { getTimestamp } from '../redux/slices/sessionSlice';

const useGetTimestamp = () => {
  const dispatch = useDispatch();

  useInterval(() => {
    dispatch(getTimestamp());
  }, 1000);
};

export default useGetTimestamp;
