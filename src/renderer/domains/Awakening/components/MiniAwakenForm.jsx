import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Box from '../../../components/Box';
import { PATTERN_FIELD, validateIntegerListString } from '../awakeningUtil';
import InputField from './FormFields/InputField';

const validateBetOrderAmounts = (betOrderAmounts) => {
  if (!betOrderAmounts) return false;
  return betOrderAmounts
    .split('-')
    .every((amount) => amount.length > 0 && Number(amount) > 0);
};

const schema = yup.object().shape({
  [PATTERN_FIELD.BET_AMOUNTS]: yup
    .string()
    .required('Vui lòng nhập số tiền cho các bước')
    .test('correct-format', 'Giá trị không hợp lệ', (val) =>
      validateBetOrderAmounts(val)
    ),

  [PATTERN_FIELD.MAX_WIN_COUNT]: yup
    .string()
    .required('Vui lòng nhập gấp thép Awaken hợp lệ')
    .test('integer-format', 'Vui lòng nhập số nguyên', (value) =>
      Number.isInteger(Number(value))
    )
    .test(
      'min-format',
      'Vui lòng nhập số lớn hơn 0',
      (value) => Number(value) > 0
    ),

  [PATTERN_FIELD.MINI_LOSES]: yup
    .string()
    .required('Vui lòng nhập số lần thua')
    .test('right-format', 'Giá trị không hợp lệ', (val) =>
      validateIntegerListString(val)
    ),
});

export default function MiniAwakenForm({ pattern, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: pattern,
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleFormSubmit = (pattern) => {
    const newPattern = { ...pattern };
    onSubmit(newPattern);
  };

  return (
    <Box className="MiniAwakenForm" boxShadow="0" px="0">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField
          name={PATTERN_FIELD.BET_AMOUNTS}
          control={control}
          label="1. Số tiền trong các bước"
          placeHolder="VD: 1-2.5-6.25-15.62-39-97.6"
        />
        <InputField
          name={PATTERN_FIELD.MAX_WIN_COUNT}
          control={control}
          label="2. Gấp thép Awaken"
          placeHolder="VD: 20"
        />
        <InputField
          name={PATTERN_FIELD.MINI_LOSES}
          control={control}
          label="3. Số lần thua"
          placeHolder="VD: 1 hoặc 1-2-3-4"
        />
        <Flex flexDir="column" align="center" pt="4">
          <Button type="submit" w="40%" variant="solid" colorScheme="teal">
            Thêm mẫu
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
