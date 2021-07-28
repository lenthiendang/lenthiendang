import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Flex, Button, Tooltip } from '@chakra-ui/react';

import scrollBar from '../../styles/scrollBar';
import Box from '../../components/Box';
import AnalysisTrigger from './AnalysisTrigger';

const Candle = ({ $type, time }) => (
  <Tooltip label={time} aria-label="Candle Times">
    <Flex mx="1" w="2" bg={$type ? 'green.500' : 'red.500'} borderRadius="sm">
      <Flex opacity="0">.</Flex>
    </Flex>
  </Tooltip>
);

const CandleList = ({ list }) => {
  const priceRef = useRef();
  const scrollToBottom = () => {
    priceRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [list.length]);

  return (
    <Flex justify="center" align="center" h="90%">
      <Flex justifyContent="flex-start">
        {list.map(({ time, session, type }) => (
          <Candle key={session} time={time} $type={type} />
        ))}
      </Flex>
      <AnalysisTrigger />
      <span ref={priceRef} />
    </Flex>
  );
};

const CandleBox = () => {
  const { list } = useSelector((state) => state.price);

  return (
    <Box
      bg="blackAlpha.800"
      boxShadow="xl"
      flexDir="row"
      overflowX="scroll"
      overflowY="hidden"
      css={scrollBar}
      w="60vw"
      h="16"
    >
      <CandleList list={list} />
    </Box>
  );
};

export default CandleBox;
