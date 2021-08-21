import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Box from '../../../components/Box';
import { PATTERN_FIELD, PATTERN_TYPE } from '../awakeningUtil';
import InputField from './FormFields/InputField';

const schema = yup.object().shape({
  [PATTERN_FIELD.BET_AMOUNTS]: yup
    .string()
    .required('Vui lòng nhập số tiền cho các bước')
    .test('correct-format', 'Giá trị không hợp lệ', (val) =>
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
});

const validateBetOrderAmounts = (betOrderAmounts) => {
  if (!betOrderAmounts) return false;
  return betOrderAmounts
    .split('-')
    .every((amount) => amount.length > 0 && Number(amount) > 0);
};

export default function MartingaleForm({ pattern, onSubmit }) {
  const { control, handleSubmit } = useForm({
    defaultValues: pattern,
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleFormSubmit = (pattern) => {
    const newPattern = { ...pattern, type: PATTERN_TYPE.MARTINGALE };
    onSubmit(newPattern);
  };

  return (
    <Box className="add-pattern-form" boxShadow="0" px="0">
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
          type="number"
          label="2. Gấp thép Awaken"
          placeHolder="VD: 20"
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
