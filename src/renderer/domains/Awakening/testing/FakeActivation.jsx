import React from 'react';
import { Button } from '@chakra-ui/button';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { setExpiredOn } from '../../../redux/slices/accountSlice';

const FakeActivation = () => {
  const dispatch = useDispatch();
  const { expiredOn } = useSelector((state) => state.account);
  const handleClick = () => {
    if (expiredOn) {
      dispatch(setExpiredOn(null));
    } else {
      let now = new Date();
      let exp = now.setUTCFullYear(2023);
      dispatch(setExpiredOn(exp));
    }
  };

  return (
    <Button colorScheme="primary" onClick={handleClick}>
      {expiredOn ? 'Disable' : ''} Fake Activation
    </Button>
  );
};

export default FakeActivation;
