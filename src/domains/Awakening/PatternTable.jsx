/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useToggle } from 'react-use';
import { useDispatch } from 'react-redux';
import {
  Flex,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from '@chakra-ui/react';

import { formatNumber } from '../../utils';

const PatternTable = ({ patterns, handleActiveOne }) => {
  return (
    <Accordion allowToggle>
      {patterns.map(({ condition, betOrders, betRatio, betPos, patternPos, profit, isActive }, id) => (
        <AccordionItem key={id} color={isActive ? 'whiteAlpha.800' : 'gray'}>
          <h2>
            <AccordionButton>
              <Flex flex="1" textAlign="left" justify="space-between">
                <Flex w="60%">
                  {condition}-
                  {betOrders.map((betOrder, id) => (
                    <Flex
                      color={
                        patternPos >= 0 && id === patternPos
                          ? betOrder.betType
                            ? 'green.400'
                            : 'red.400'
                          : ''
                      }
                      fontWeight={patternPos >= 0 && id === patternPos ? 'bold' : 'medium'}
                      align="flex-end"
                    >
                      <Text>{betOrder.betType ? 'T' : 'G'}</Text>
                      <Text fontSize="xs">{formatNumber(betOrder.betAmount * betRatio[betPos])}</Text>
                    </Flex>
                  ))}
                </Flex>
                <Flex w="25%">
                  {patternPos >= 0 ? (
                    <Flex align="flex-end">
                      Lượt {betPos + 1}/{betRatio.length}(
                      <Flex as="span" fontSize="xs">
                        {betRatio[betPos]}x
                      </Flex>
                      )
                    </Flex>
                  ) : (
                    'Chưa bắt đầu'
                  )}
                </Flex>
                <Text w="15%">{formatNumber(profit)}$</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} display="flex" justify="center">
            <Button colorScheme={isActive ? 'red' : 'green'} onClick={() => handleActiveOne(id)} m="auto">
              {isActive ? 'Dừng' : 'Chạy'}
            </Button>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default PatternTable;
