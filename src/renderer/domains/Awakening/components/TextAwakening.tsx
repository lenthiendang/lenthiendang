import {
  Box,
  chakra,
  ChakraProvider,
  Container,
  HTMLChakraProps,
} from '@chakra-ui/react';
import { HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CoinGif from '../../../../../assets/images/awaken-coin.gif';

type Merge<P, T> = Omit<P, keyof T> & T;

type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>;

export const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div);

interface TextAwakeningProp {
  enabled: boolean;
}

const nonTextShadow = ['0 0 0 #fff', '0 0 0 #fff'];

const activeTextShadow = [
  `
    0 0 10px #AAFF00,
    0 0 45px #AAFF00,
    0 0 55px #AAFF00,
    0 0 70px #AAFF00,
    0 0 80px #AAFF00
  `,
  `
    0 0 40px #AAFF00,
    0 0 80px #AAFF00,
    0 0 90px #AAFF00,
    0 0 100px #AAFF00,
    0 0 150px #AAFF00
  `,
];

function TextAwakening(props: TextAwakeningProp) {
  const { enabled } = props;

  return (
    <ChakraProvider>
      <Container d="flex" alignItems="center" justifyContent="center">
        <Box
          position="absolute"
          transform="translateX(calc(-100% - 60px))"
          transition="all 0.3s"
          width={enabled ? '30px' : '0'}
        >
          <img src={CoinGif} alt="coin-gif" width="26px" />
        </Box>
        <MotionBox
          as="aside"
          animate={{
            textShadow: enabled ? activeTextShadow : nonTextShadow,
            color: enabled ? ['#AAFF00', '#AAFF0098'] : '#fff',
          }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            times: [0, 1],
            repeat: Infinity,
            repeatType: 'loop',
            direction: 'alternate',
          }}
          display="flex"
          fontSize="20px"
          color={enabled ? '#AAFF00' : '#FFF'}
          letterSpacing={enabled ? '3px' : '1px'}
          fontWeight={enabled ? 'bold' : 'normal'}
          textShadow="0 0 10px #fff"
        >
          {enabled ? 'Awakening' : 'Sleeping'}
        </MotionBox>
      </Container>
    </ChakraProvider>
  );
}

export default TextAwakening;
