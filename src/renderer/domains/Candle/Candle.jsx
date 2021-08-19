import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';

import scrollBar from '../../styles/scrollBar';
import Box from '../../components/Box';
import CandleList from './containers/CandleList';

import AnalysisTrigger from './components/AnalysisTrigger';

const CandleBox = () => {
  const lastCandleRef = useRef();
  const { list } = useSelector((state) => state.price);

  const scrollToBottom = () => {
    lastCandleRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [list.length]);

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
      mb="4"
    >
      <Flex justify="center" align="center" h="90%">
        <CandleList candles={list} />
        <AnalysisTrigger />
        <span ref={lastCandleRef} />
      </Flex>
    </Box>
  );
};

export default CandleBox;
