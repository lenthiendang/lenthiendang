import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

import TestingButton from './TestingButton';

const TestingAwaken = () => {
  return (
    <Flex flexDir="column" align="center" w="xl" h="xs" bg="blackAlpha.800">
      <TestingButton />
      <Text color="whiteAlpha.900">Danh sách user đang đăng ký awaken</Text>
    </Flex>
  );
};

export default TestingAwaken;
