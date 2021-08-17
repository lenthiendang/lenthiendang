import React from 'react';
import { useController } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormHelperText, Radio, RadioGroup, Stack } from '@chakra-ui/react';

export default function RadioField(props) {
  const {
    name,
    control,
    label = '',
    direction = 'row',
    items = [],
    onValueChange
  } = props;

  const {
    field: { value, onChange, ref },
    fieldState: { invalid, error: { type, types, message } = {} }
  } = useController({ name, control });

  const handleOnchange = (e) => {
    onChange(e);
    onValueChange(e.target.value);
  }

  return (
    <FormControl mt="10px" isInvalid={invalid}>
      <FormHelperText>{label}</FormHelperText>
      <RadioGroup ref={ref} value={value}>
        <Stack direction={direction}>
          {items.map((item) => (
            <Radio key={item.value} onChange={handleOnchange} value={item.value}>
              {item.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{message}</FormErrorMessage>
    </FormControl>
  );
}
