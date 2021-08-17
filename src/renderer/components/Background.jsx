import React from 'react';
import { Box } from '@chakra-ui/react';

import background from '../../../assets/images/background.jpg';

const Background = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      position="fixed"
      zIndex="-1"
      background={`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${background}') center center/cover no-repeat`}
    />
  );
};

export default Background;
