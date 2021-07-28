import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from '@chakra-ui/react';

import useGetTimestamp from '../../hooks/useGetTimestamp';
import { theme } from '../../styles';
import Box from '../../components/Box';
// import StartButton from './StartButton';

const statuses = [
  { title: 'Kích hoạt', color: 'blue' },
  { title: 'Dừng chạy', color: 'red' },
];

const TimestampBox = () => {
  const dispatch = useDispatch();
  const {
    account,
    session: { counter, isBetSession },
  } = useSelector((state) => state);

  const [status, setStatus] = useState(statuses[0]);

  return (
    <Box
      gridArea="timestamp"
      color="whiteAlpha.900"
      justify="space-between"
      align="center"
      bg={`${theme.colors[status.color][900]}${theme.opacity[600]}`}
      py="4"
      px="0"
      m="10"
      w="16rem"
      h="12rem"
    >
      {isBetSession ? 'Có thể đặt lệnh' : 'Đang chờ kết quả'}
      <Text fontSize="5xl">{counter ? counter : 'Loading'}</Text>
      {/* <StartButton title={status.title} color={status.color} /> */}
    </Box>
  );
};

export default TimestampBox;
