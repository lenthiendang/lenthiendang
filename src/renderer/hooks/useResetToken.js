import { useInterval } from 'react-use';
import { useDispatch } from 'react-redux';
import { resetToken } from '../redux/slices/authSlice';

const useResetToken = () => {
  const dispatch = useDispatch();
  useInterval(() => {
    // console.log('resetToken');
    dispatch(resetToken());
  }, 60 * 2000);
};

export default useResetToken;
