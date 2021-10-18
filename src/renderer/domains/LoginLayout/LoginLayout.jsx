import React from 'react';
import { Flex } from '@chakra-ui/react';

import ExchangeList from './containers/ExchangeList';
import { exchanges } from '../../../constant/exchanges';
import LoginBox from './containers/LoginBox';

const Login = () => {
  return (
    <Flex h="100vh" flexDir="column">
      <LoginBox />
      <ExchangeList exchanges={exchanges} />
    </Flex>
  );
};

export default Login;
