import React from 'react';
import { Flex } from '@chakra-ui/react';

import Exchange from '../components/Exchange';

const ExchangeList = ({ exchanges }) => {
  return (
    <Flex
      h="6vh"
      w="48rem"
      p="auto"
      mx="auto"
      mb="2"
      align="space-between"
      justify="space-between"
    >
      {Object.entries(exchanges).map(([key, value]) => (
        <Exchange key={key} name={key} logo={value.logo} />
      ))}
    </Flex>
  );
};

export default ExchangeList;
