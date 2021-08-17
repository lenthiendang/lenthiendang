import React from 'react';
import { Flex } from '@chakra-ui/react';

import useAfterSession from '../hooks/useAfterSession';
import useGetTimestamp from '../hooks/useGetTimestamp';
import Timestamp from '../domains/Timestamp';
import Awakening from '../domains/Awakening';
import Candle from '../domains/Candle';

const Dashboard = () => {
  useAfterSession();
  useGetTimestamp();

  return (
    <Flex h="100vh" w="100vw" overflow="hidden" p="1">
      <Flex m="auto" alignItems="center" justifyItems="center" flexDir="column">
        <Timestamp/>
        <Candle/>
        <Awakening/>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
