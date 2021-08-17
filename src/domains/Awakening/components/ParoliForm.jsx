import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex } from '@chakra-ui/react';
import Box from '../../../components/Box';
import { useForm } from 'react-hook-form';
import { betConditionRegExp, betOrderRegExp, PATTERN_FIELD, PATTERN_TYPE } from '../awakeningUtil';
import InputField from './FormFields/InputField';
import * as yup from 'yup';


const schema = yup.object().shape({
  [PATTERN_FIELD.CONDITION]: yup
    .string()
    .required('Vui lòng nhập thế nến')
    .test(
      'right-format',
      'Thế nến không hợp lệ',
      (val) => betConditionRegExp.test(val)
    ),
  [PATTERN_FIELD.BET_ORDERS]: yup
    .string()
    .required('Vui lòng nhập lệnh đặt')
    .test(
      'right-format',
      'Lệnh đặt không hợp lệ',
      (val) => betOrderRegExp.test(val)
    ),
  [PATTERN_FIELD.BET_RATIOS]: yup
    .string()
    .required('Vui lòng nhập tỷ lệ đặt')
    .test(
      'correct-format',
      'Tỷ lệ đặt không hợp lệ',
      (val) => validateBetRatios(val)
    ),
  [PATTERN_FIELD.BET_LOOP]: yup
    .string()
    .required('Vui lòng nhập gấp rắn Awaken')
    .test(
      'right-format',
      'Gấp rắn awaken không hợp lệ',
      (val) => validateBetLoop(val)
    )
    .test(
      'bet-loop-match',
      'Gấp rắn Awaken không phù hợp với tỷ lệ đặt',
      function(value) {
        return Number(value) > 0 ||
          this.parent[PATTERN_FIELD.BET_RATIOS].split('-').length === value.split('-').length;
      }
    )
});

const validateBetLoop = (betLoop) => {
  return (betLoop && betLoop.startsWith('-') || betLoop.endsWith('-')) ? false
    : betLoop.split('-').every((loopNumber) => Number.isInteger(Number(loopNumber)));
};

const validateBetRatios = (betRatios) => {
  if (betRatios && betRatios.startsWith('-') || betRatios.endsWith('-')) return false;
  return betRatios.split('-').every((ratio) => {
    return typeof Number(ratio) === 'number' && isFinite(ratio) && Number(ratio) > 0;
  });
};

export default function ParoliForm({ pattern, onSubmit, mode = 'ADD' }) {
const isAddMode = mode === 'ADD';
  const { control, handleSubmit } = useForm({
    defaultValues: pattern,
    resolver: yupResolver(schema)
  });

  const paroliInputs = () => (
    <>
      <InputField
        name={PATTERN_FIELD.CONDITION}
        control={control}
        isUpperCase={true}
        label="1. Thế nến"
        placeHolder="VD: 2T3G1T"
      />
      <InputField
        name={PATTERN_FIELD.BET_ORDERS}
        control={control}
        isUpperCase={true}
        label="2. Lệnh đặt"
        placeHolder="VD: T2G4.1G0G0G10.43"
      />
      <InputField
        name={PATTERN_FIELD.BET_RATIOS}
        control={control}
        label="4. Danh sách tỷ lệ"
        placeHolder="VD: 1-2-4-8"
      />
      <InputField
        name={PATTERN_FIELD.BET_LOOP}
        control={control}
        label="3. Gấp rắn Awaken"
        placeHolder="VD: 300 hoặc 300-500-700-900"
      />
    </>
  );

  const handleFormSubmit = (pattern) => {
    onSubmit(pattern);
  };

  return (
    <Box className="add-pattern-form" boxShadow="0" px="0">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {paroliInputs()}
        <Flex flexDir="column" align="center" pt="4">
          <Button type="submit" w="40%" variant="solid" colorScheme="teal">
            {isAddMode? 'Thêm mẫu' : 'Lưu'}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
