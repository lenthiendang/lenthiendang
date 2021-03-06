import React from 'react';
import { Flex } from '@chakra-ui/react';

import useResetToken from '../hooks/useResetToken';
import useAfterSession from '../hooks/useAfterSession';
import Timestamp from '../domains/Timestamp';
import Awakening from '../domains/Awakening';
import Candle from '../domains/Candle';
import UserInfo from 'renderer/domains/UserInfo';
import Header from 'renderer/domains/Header';

const Dashboard = () => {
  useAfterSession();
  useResetToken();

  return (
    <Flex h="100vh" w="100vw" overflow="hidden" p="1">
      <Flex m="auto" alignItems="center" justifyItems="center" flexDir="column">
        <Header />
        <UserInfo />
        <Timestamp />
        <Candle />
        <Awakening />
      </Flex>
    </Flex>
  );
};

export default Dashboard;
