import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useCheckLogin = () => {
  const {
    account: { role },
    auth: { showForm },
    price: { list },
  } = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (role === undefined || role < 0 || showForm || !list.length) {
      history.push('/login');
    } else {
      history.push('/dashboard');
    }
  }, [dispatch, role, showForm, list, history]);
};

export default useCheckLogin;
