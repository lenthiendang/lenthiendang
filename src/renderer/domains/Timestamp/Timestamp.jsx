import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';

import theme from '../../styles';
import Box from '../../components/Box';
import useGetTimestamp from '../../hooks/useGetTimestamp';

const statuses = [
  { title: 'Kích hoạt', color: 'blue' },
  { title: 'Dừng chạy', color: 'red' },
];

const TimestampBox = () => {
  const {
    session: { isBetSession },
  } = useSelector((store) => store);

  const [status] = useState(statuses[0]);
  const counter = useGetTimestamp();

  return (
    <Box
      gridArea="timestamp"
      color="whiteAlpha.900"
      justify="space-between"
      align="center"
      bg={`${theme.colors[status.color][900]}${theme.opacity[600]}`}
      py="4"
      px="0"
      m="0 10 0 10"
      w="16rem"
      h="6rem"
    >
      {isBetSession ? 'Có thể đặt lệnh' : 'Đang chờ kết quả'}
      <Text fontSize="4xl">
        {counter && counter >= 0 ? counter : 'Đang khởi tạo'}
      </Text>
    </Box>
  );
};

export default TimestampBox;
