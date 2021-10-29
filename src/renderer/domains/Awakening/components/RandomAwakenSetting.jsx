import {
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Box from '../../../components/Box';
import {
  setStopLossPoint,
  setTakeProfitPoint,
} from '../../../redux/slices/awakeningSlice';
import InputField from './FormFields/InputField';

export const FORM_FIELD = {
  STOP_LOSS_POINT: 'stopLossPoint',
  TAKE_PROFIT_POINT: 'takeProfitPoint',
};

const defaultValues = {
  [FORM_FIELD.STOP_LOSS_POINT]: '',
  [FORM_FIELD.TAKE_PROFIT_POINT]: '',
};

const schema = yup.object().shape({
  [FORM_FIELD.STOP_LOSS_POINT]: yup
    .string()
    .test('min', 'Giá trị tối thiểu là 10', (val) => Number(val) >= 10)
    .test(
      'right-format',
      'Giá trị không hợp lệ',
      (val) => val === '' || !Number.isNaN(Number(val))
    ),
  [FORM_FIELD.TAKE_PROFIT_POINT]: yup
    .string()
    .test(
      'right-format',
      'Giá trị không hợp lệ',
      (val) => val === '' || !Number.isNaN(Number(val))
    ),
});

export default function RandomAwakenSetting({
  isRunning,
  funds,
  setFunds,
  fundsOptions,
}) {
  const dispatch = useDispatch();
  const awakenDisclosure = useDisclosure();
  const { stopLossPoint, takeProfitPoint } = useSelector(
    (state) => state.awakening
  );
  const { isOpen, onOpen, onClose } = awakenDisclosure;
  const { control, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    setValue(FORM_FIELD.STOP_LOSS_POINT, '');
    setValue(FORM_FIELD.TAKE_PROFIT_POINT, '');
    onClose();
  };

  const handleFormSubmit = (values) => {
    let stopLoss =
      values[FORM_FIELD.STOP_LOSS_POINT] === ''
        ? 0
        : values[FORM_FIELD.STOP_LOSS_POINT];
    if (Number(stopLoss) > 0) {
      stopLoss = -1 * Number(stopLoss);
    }

    const takeProfit =
      values[FORM_FIELD.TAKE_PROFIT_POINT] === ''
        ? 0
        : values[FORM_FIELD.TAKE_PROFIT_POINT];

    dispatch(setStopLossPoint(Number(stopLoss)));
    dispatch(setTakeProfitPoint(Number(takeProfit)));
    handleCloseModal();
  };

  const renderInputs = () => (
    <>
      <InputField
        name={FORM_FIELD.STOP_LOSS_POINT}
        control={control}
        isUpperCase
        label="1. Cắt lỗ"
      />
      <InputField
        name={FORM_FIELD.TAKE_PROFIT_POINT}
        control={control}
        isUpperCase
        label="2. Chốt lời"
      />
    </>
  );

  const renderFundsInput = () => (
    <FormControl mt="10px">
      <FormHelperText>3. Vốn</FormHelperText>
      <Select
        backgroundColor="transparent"
        value={funds}
        disabled={isRunning}
        onChange={(e) => setFunds(e.target.value)}
      >
        {fundsOptions.reverse().map((fundsValue) => (
          <option key={fundsValue} value={fundsValue}>
            {fundsValue}
          </option>
        ))}
      </Select>
    </FormControl>
  );

  const renderSettingForm = () => (
    <Box className="add-pattern-form" boxShadow="0" px="0">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Text fontWeight="bold">Sửa</Text>
        {renderInputs()}
        {renderFundsInput()}
        <Flex flexDir="column" align="center" pt="4">
          <Button type="submit" w="40%" variant="solid" colorScheme="teal">
            Lưu
          </Button>
        </Flex>
      </form>
    </Box>
  );

  return (
    <>
      <Button
        ml="10px"
        colorScheme="yellow"
        color="#350048"
        height="30px"
        disabled={isRunning}
        onClick={onOpen}
      >
        Setting
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered size="xs">
        <ModalOverlay />
        <ModalContent bg="white">
          <ModalHeader pb="0">
            <Center>SETTING</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="space-between">
              <Text color="green.400" fontWeight="bold">
                Cắt lỗ: {stopLossPoint === 0 ? '∞' : stopLossPoint}
              </Text>
              <Text color="green.400" fontWeight="bold">
                Chốt lời: {takeProfitPoint === 0 ? '∞' : takeProfitPoint}
              </Text>
            </Flex>
            {renderSettingForm()}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
