import React from 'react';
import { Flex } from '@chakra-ui/react';

import LoginLayout from '../domains/LoginLayout';

const Login = () => {
  return (
    <Flex
      h="100vh"
      w="100vw"
      overflow="hidden"
      p="1"
      align="center"
      justify="center"
    >
      <LoginLayout />
    </Flex>
  );
};

export default Login;
