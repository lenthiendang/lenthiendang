import React from 'react';
import { useController } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react';

export default function InputField(props) {
  const { name, control, label = '', placeHolder = '', isUpperCase, defaultValue = '',...inputProps } = props;
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error: { type, types, message } = {} }
  } = useController({ name, control });

  const handleOnchange = (event) => {
    event && event.preventDefault();
    const cloneEvent = { ...event };
    if (isUpperCase) {
      cloneEvent.target.value = cloneEvent.target.value.toUpperCase();
    }
    onChange(cloneEvent);
  };

  return (
    <FormControl mt="10px" isInvalid={invalid}>
      <FormHelperText>{label}</FormHelperText>
      <Input
        ref={ref}
        placeholder={placeHolder}
        value={value || defaultValue}
        onChange={handleOnchange}
        onBlur={onBlur}
        {...inputProps}
      />
      <FormErrorMessage>{message}</FormErrorMessage>
    </FormControl>
  );
}
