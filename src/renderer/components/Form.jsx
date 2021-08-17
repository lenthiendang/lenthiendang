import React from 'react';
import {
  Flex,
  Text,
  FormControl as CFormControl,
  FormLabel as CFormLabel,
  FormErrorMessage as CFormErrorMessage,
  Input as CInput,
  Button as CButton,
} from '@chakra-ui/react';

export const FormControl = (props) => <CFormControl my="2" {...props} />;
export const FormLabel = (props) => <CFormLabel color="primary.500" fontSize="sm" m="0" {...props} />;

export const FormErrorMessage = (props) => (
  <Text color="red.400" fontSize="sm" fontStyle="italic" m="0" {...props}>
    *{props.children}
  </Text>
);

export const Input = (props) => <CInput color="primary.500" borderColor="primary.500" {...props} />;
export const SubmitButton = (props) => (
  <CButton type="submit" colorScheme="primary" mx="auto" my="4" {...props} />
);

const Form = (props) => <Flex as="form" flexDir="column" justify="center" {...props} />;
export default Form;
