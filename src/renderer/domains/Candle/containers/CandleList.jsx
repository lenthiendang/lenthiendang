import React from 'react';
import { Flex } from '@chakra-ui/react';

import Candle from '../components/Candle';

const CandleList = ({ candles }) => {
  return (
    <Flex justifyContent="flex-start">
      {candles.map(({ time, session, type }) => (
        <Candle key={session} time={time} $type={type} />
      ))}
    </Flex>
  );
};

export default CandleList;
