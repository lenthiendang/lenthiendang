import useUpdateCandle from './useUpdateCandle';
import useRiskManagement from './useRiskManagement';

const useAfterSession = () => {
  useUpdateCandle();
  // others
  useRiskManagement();
};

export default useAfterSession;
