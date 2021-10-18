import React from 'react';
import { Flex, Image, Tooltip } from '@chakra-ui/react';

const Exchange = ({ name, logo }) => {
  return (
    <Tooltip
      key={name}
      label={
        name === process.env.EXCHANGE
          ? `Bạn đang sử dụng AI giành cho ${name}`
          : `Vui lòng tải AI giành cho ${name}`
      }
      aria-label="A tooltip"
    >
      <Flex
        w="6rem"
        px="2"
        cursor="pointer"
        border="1px solid"
        borderColor={
          name === process.env.EXCHANGE ? 'primary.400' : '#ffffff00'
        }
        borderRadius="3xl"
      >
        <Image src={logo} />
      </Flex>
    </Tooltip>
  );
};

export default Exchange;
