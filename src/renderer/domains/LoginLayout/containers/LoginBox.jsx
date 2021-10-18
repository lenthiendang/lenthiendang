import React from 'react';
import { Center, Flex } from '@chakra-ui/react';

import Box from '../../../components/Box';
import exchange, { colors } from '../../../../constant/exchanges';
import LoginLeft from './LoginLeft';
import LoginRight from './LoginRight';

const Login = () => {
  return (
    <Center h="94vh">
      <Box p="0" overflow="hidden">
        <Flex w="3xl" h="22rem">
          <LoginLeft exchange={exchange} colors={colors} />
          <LoginRight />
        </Flex>
      </Box>
    </Center>
  );
};

export default Login;
