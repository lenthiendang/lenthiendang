import React from 'react';
import { Flex, Tooltip } from '@chakra-ui/react';

const Candle = ({ $type, time }) => (
  <Tooltip label={time} aria-label="Candle Times">
    <Flex mx="1" w="2" bg={$type ? 'green.500' : 'red.500'} borderRadius="sm">
      <Flex opacity="0">.</Flex>
    </Flex>
  </Tooltip>
);

export default Candle;
