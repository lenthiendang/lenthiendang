import React from 'react';
import { Flex, Image } from '@chakra-ui/react';

import ContactList from './ContactList';
import aiSticker from '../../../../../assets/images/aiStickerTrans.png';
import getTeamLogo from '../../../../utils/getLogo';

const teamLogo = getTeamLogo();

const LoginLeft = ({ exchange, colors }) => {
  return (
    <Flex
      bg="primary.900"
      minW="19rem"
      w="19rem"
      py="4"
      boxShadow={`0 0 1rem 0.1rem ${colors.primary[800]}`}
      zIndex="1"
    >
      <Flex w="100%" flexDir="column" justify="space-between" align="center">
        <Flex flexDir="column" align="center">
          <Flex color="primary.300" fontSize="xs" py="1">
            AIAwaken v{process.env.VERSION}
          </Flex>
          <Image src={exchange.logo} alt={process.env.EXCHANGE} w="5rem" />
        </Flex>
        <Flex flexDir="column" align="center" w="100%" justify="center" mt="4">
          <Image
            src={aiSticker}
            alt={process.env.EXCHANGE}
            w="28rem"
            h="6rem"
            objectFit="cover"
          />
          <Image
            justifySelf="flex-end"
            mt="1"
            src={teamLogo}
            w="8rem"
            h="5.5rem"
            objectFit="contain"
            objectPosition="top center"
            alt={process.env.EXCHANGE}
          />
        </Flex>
        <ContactList contacts={exchange.contacts} />
      </Flex>
    </Flex>
  );
};

export default LoginLeft;
