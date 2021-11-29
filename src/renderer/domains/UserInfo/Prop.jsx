import React from 'react';
import { Flex, Avatar, Icon } from '@chakra-ui/react';

export const PropAttr = (props) => (
  <Flex as="dl" justify="space-between" align="center" {...props} my="0.5" />
);
export const PropName = (props) => (
  <Flex as="dt" color="gray.800" align="center" fontSize="sm" mr="1" {...props} />
);
export const PropIcon = ({ icon }) => <Icon as={icon} mr="2" boxSize="5" />;
export const PropVal = (props) => (
  <Flex as="dd" p="0" pl="4" fontSize="md" fontWeight="bold" lineHeight="1" {...props} />
);
export const AvatarBox = ({ url }) => (
  <Avatar m="auto" mr="1rem" size="2xl" name="L t d" src={url || null} />
);
