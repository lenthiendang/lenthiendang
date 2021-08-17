import { useDispatch } from 'react-redux';

import useUpdateCandle from './useUpdateCandle';

const useAfterSession = () => {
  useUpdateCandle();
  // others
};

export default useAfterSession;
