import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const Overlay = () => {
  const { expiredOn, accountType } = useSelector((state) => state.account);

  if (
    (expiredOn && dayjs(expiredOn).diff(dayjs()) > 0) ||
    accountType === 'DEMO'
  ) {
    return '';
  }

  return (
    <Flex
      top={0}
      left={0}
      bottom={0}
      right={0}
      pos="absolute"
      bg="blackAlpha.800"
      align="center"
      justify="center"
      color="orange.100"
      fontWeight="bold"
    >
      Vui lòng Gia hạn tài khoản để sử dụng Awaken!
    </Flex>
  );
};

export default Overlay;
