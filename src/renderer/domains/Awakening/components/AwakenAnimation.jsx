import { Box } from '@chakra-ui/react';
import React from 'react';
import BarWave from 'react-cssfx-loading/lib/BarWave';
import AwakenTextImg from '../../../../../assets/images/awakening-neon.png';
import sleepingTextImg from '../../../../../assets/images/sleeping-neon.png';

function AwakenAnimation({ enabled }) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box
        width={enabled ? '35px' : '0'}
        transition="all .3s ease-in-out"
        position="relative"
        zIndex="1"
        left="10px"
      >
        {enabled && (
          <BarWave color="#aaff00" width="35px" height="15px" duration="1s" />
        )}
      </Box>
      <img
        src={enabled ? AwakenTextImg : sleepingTextImg}
        alt="awakening-img"
      />
    </Box>
  );
}

export default React.memo(AwakenAnimation);
