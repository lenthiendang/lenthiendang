import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { prop, sort, descend } from 'ramda';

const byCount = descend(prop('count'));

const initPattern = (length) => {
  let numberOfPattern = 1;
  const done = {};
  for (let i = 0; i < length; i++) {
    numberOfPattern *= 2;
  }
  for (let i = 0; i < numberOfPattern; i++) {
    const candle = i
      .toString(2)
      .split('')
      .map((cd) => (cd === '0' ? 'G' : 'T'));
    while (candle.length < length) {
      candle.unshift('G');
    }
    done[candle.join('')] = 0;
  }
  return done;
};

const convertCandleListToString = (candles) => {
  return candles.map((candle) => (candle.type ? 'T' : 'G')).join('');
};

const countCandle = (list, length, isDuplicated) => {
  const stringList = convertCandleListToString(list);
  const done = initPattern(length);
  let lastCandle = null;
  let lastSession = null;
  for (let i = 0; i <= stringList.length - length; i++) {
    if (!done[stringList.slice(i, i + length)]) {
      done[stringList.slice(i, i + length)] = 1;
    } else {
      const key = stringList.slice(i, i + length);
      if (!isDuplicated) {
        if (
          lastCandle !== key ||
          (lastCandle === key && i - lastSession === length)
        ) {
          done[key] += 1;
          lastCandle = key;
          lastSession = i;
        } else {
          // console.log(i - lastSession === length);
        }
      } else {
        done[key] += 1;
      }
    }
  }

  const sortedCandleByCount = sort(
    byCount,
    Object.entries(done).map(([key, val]) => ({ type: key, count: val }))
  );
  return {
    max: sortedCandleByCount.slice(0, 10),
    min: sortedCandleByCount.slice(-10).reverse(),
  };
};

const CandleCounter = ({ candles, title }) => {
  return (
    <Flex flexDir="column" justify="center">
      <Text>{title}</Text>
      {candles.map((candle) => (
        // eslint-disable-next-line react/jsx-key
        <Flex>
          {candle.type.split('').map((type, id) => (
            <Flex
              // eslint-disable-next-line react/no-array-index-key
              key={id}
              w="1rem"
              border="0.5px solid"
              justify="center"
              borderColor="whiteAlpha.500"
              borderRadius="sm"
              bg={type === 'T' ? 'green.500' : 'red.500'}
            >
              <Text>{type}</Text>
            </Flex>
          ))}
          <Text ml="2">{candle.count} lần</Text>
        </Flex>
      ))}{' '}
    </Flex>
  );
};

const CandleAnalysis = ({ list }) => {
  const [candles, setCandles] = useState({ max: [], min: [] });
  useEffect(() => {
    setCandles(countCandle(list, 6, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.length]);

  return (
    <Flex flexDir="column" w="100%">
      <Flex justify="space-around">
        <CandleCounter
          candles={candles.max}
          title="Xuất hiện nhiều nhất"
          desc="Dùng cho các phương pháp Paroli cơ bản"
        />
        <CandleCounter
          candles={candles.min}
          title="Xuất hiện ít nhất"
          desc="Dùng cho các phương pháp Martingale cơ bản"
        />
      </Flex>
    </Flex>
  );
};

export default CandleAnalysis;
