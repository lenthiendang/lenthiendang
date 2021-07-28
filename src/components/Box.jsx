import React from 'react';
import { Flex } from '@chakra-ui/react';

const Box = (props) => (
  <Flex background="#ffffffdd" borderRadius="md" px="6" py="0" flexDir="column" boxShadow="2xl" {...props} />
);

export default Box;
