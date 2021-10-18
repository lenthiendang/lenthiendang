import React from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { BiPhoneCall } from 'react-icons/bi';

import Contact from '../components/Contact';

const ContactList = ({ contacts }) => {
  return contacts ? (
    <Flex align="center">
      <Icon as={BiPhoneCall} color="primary.300" mr="3" w={5} h={5} />
      <Flex flexDir="column">
        {contacts.map((contact, id) => (
          <Contact
            // eslint-disable-next-line react/no-array-index-key
            key={id}
            name={contact.name}
            phone={contact.phone}
          />
        ))}
      </Flex>
    </Flex>
  ) : (
    ''
  );
};

export default ContactList;
