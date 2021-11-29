import React from 'react';
import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';

import UserSection from './UserSection';
import BalanceSection from './BalanceSection';

const UserInfo = () => {
  const account = useSelector((store) => store.account);
  return (
    <Flex h="40" w="50rem" justify="space-between">
      <UserSection account={account} />
      <BalanceSection account={account} />
    </Flex>
  );
};

export default React.memo(UserInfo);
