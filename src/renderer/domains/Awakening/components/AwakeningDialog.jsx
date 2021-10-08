import { Box } from '@chakra-ui/react';
import React from 'react';
import TextAwakening from './TextAwakening';

const buttonStyles = {
  content: `""`,
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '30px',
  height: '10px',
  borderRadius: '10px',
  backgroundColor: '#aaff00',
  transition: '0.5s',
  background: '#163dc7',
  boxShadow: `0 0 5px #163dc7,
            0 0 15px #163dc7,
            0 0 30px #163dc7,
            0 0 30px #163dc7`,
};
const buttonHoverStyles = {
  height: '50%',
  width: '90%',
  borderRadius: '30px',
  transitionDelay: '0.5s',
};

function AwakeningDialog({ enabled, backgroundColor }) {
  const containerBtnStyles = enabled ? buttonHoverStyles : {};
  return (
    <Box
      className="AwakeningDialog"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="336px"
      height="70px"
      margin="0 auto"
      backgroundColor={backgroundColor}
    >
      <Box className="container" display="flex" justifyContent="space-around">
        <Box
          className="btn"
          position="relative"
          width="300px"
          height="40px"
          margin="5px"
          _before={{
            bottom: enabled ? '0' : '-5px',
            ...buttonStyles,
            ...containerBtnStyles,
          }}
          _after={{
            top: enabled ? '0' : '-5px',
            ...buttonStyles,
            ...containerBtnStyles,
          }}
        >
          <Box
            className="button-content"
            position="relative"
            zIndex="1"
            top="0"
            left="0"
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor="rgba(255,255,255,0.05)"
            boxShadow="0 15px 35px rgba(0,0,0,0.2)"
            borderTop="1px solid rgba(255,255,255,0.1)"
            borderBottom="1px solid rgba(255,255,255,0.1)"
            borderRadius="30px"
            color="#fff"
            fontWeight="400"
            letterSpacing={enabled ? '3px' : '1'}
            textDecoration="none"
            overflow="hidden"
            transition="0.5s"
            cursor="pointer"
            backdropFilter="blur(15px)"
            _before={{
              content: `""`,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background:
                'linear-gradient(to left, rgba(255,255,255,0.15), transparent)',
              transform: `skew(45deg) translateX(${enabled ? '200%' : '0'})`,
              transition: '0.5s',
              transitionDelay: '0.5s',
            }}
          >
            <TextAwakening enabled={enabled} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(AwakeningDialog);
