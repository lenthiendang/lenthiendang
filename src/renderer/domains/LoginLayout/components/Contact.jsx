import React from 'react';
import { Text } from '@chakra-ui/react';

const ContactList = ({ name, phone }) => {
  return (
    <Text
      as="div"
      display="flex"
      justifyContent="space-between"
      fontSize="0.7rem"
      fontWeight="bold"
      color="primary.300"
    >
      <Text>{name}:</Text>
      <Text ml="2">{phone}</Text>
    </Text>
  );
};

export default ContactList;
