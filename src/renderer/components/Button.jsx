/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Button as CButton } from '@chakra-ui/react';

export const Button = (props) => <CButton colorScheme="primary" {...props} />;
export const ButtonWithIcon = (props) => (
  <Button
    leftIcon={props.icon}
    colorScheme="primary"
    variant="solid"
    {...props}
  />
);
