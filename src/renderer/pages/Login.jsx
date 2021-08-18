import React from 'react';
import { Flex } from '@chakra-ui/react';

import LoginBox from '../domains/Login';

const Login = () => {
  return (
    <Flex h="100vh" w="100vw" overflow="hidden" p="1">
      <LoginBox />
    </Flex>
  );
};

export default Login;
