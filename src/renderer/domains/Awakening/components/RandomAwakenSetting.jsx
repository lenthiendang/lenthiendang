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
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { batch, useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Box from '../../../components/Box';
import {
  setStopLossPoint,
  setTakeProfitPoint,
  setFunds,
  setPlayMode,
  setCommonParoliFunds,
} from '../../../redux/slices/awakeningSlice';
import { PLAY_MODE, VALID_FUNDS } from '../awakeningUtil';
import InputField from './FormFields/InputField';
import RadioField from './FormFields/RadioField';

export const FORM_FIELD = {
  STOP_LOSS_POINT: 'stopLossPoint',
  TAKE_PROFIT_POINT: 'takeProfitPoint',
  PLAY_MODE: 'playMode',
  PAROLI_COMMON_FUNDS: 'paroliCommonFunds',
};

const schemaPersonalValidation = {
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
};

const schemaCommonValidation = {
  ...schemaPersonalValidation,
  [FORM_FIELD.PAROLI_COMMON_FUNDS]: yup.string().when(FORM_FIELD.PLAY_MODE, {
    is: PLAY_MODE.COMMON,
    then: yup
      .string()
      .required('Vui lòng nhập giá trị')
      .test(
        'right-format',
        'Giá trị phải là số nguyên lớn hơn 0',
        (val) =>
          val === '' || (Number.isInteger(Number(val)) && Number(val) > 0)
      ),
    otherwise: yup.string(),
  }),
};

const getSchema = (playMode) =>
  yup
    .object()
    .shape(
      playMode === PLAY_MODE.COMMON
        ? schemaCommonValidation
        : schemaPersonalValidation
    );

function RandomAwakenSetting({ isRunning, showSelectMode = true }) {
  const dispatch = useDispatch();
  const awakenDisclosure = useDisclosure();
  const fundsOptions = useMemo(() => ['', ...VALID_FUNDS], []);
  const [personalFunds, setPersonalFunds] = useState('');
  const [formPlayMode, setFormPlayMode] = useState(PLAY_MODE.PERSONAL);
  const { playMode, funds, commonParoliFunds, stopLossPoint, takeProfitPoint } =
    useSelector((state) => state.awakening);
  const { balance } = useSelector((state) => state.account);
  const { isOpen, onOpen, onClose } = awakenDisclosure;

  const defaultValues = {
    [FORM_FIELD.STOP_LOSS_POINT]: '',
    [FORM_FIELD.TAKE_PROFIT_POINT]: '',
  };

  const { control, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(getSchema(playMode)),
  });

  useEffect(() => {
    setPersonalFunds(funds);
    setValue(FORM_FIELD.PAROLI_COMMON_FUNDS, commonParoliFunds);
    setFormPlayMode(playMode);
    setValue(FORM_FIELD.PLAY_MODE, playMode);
    setValue(FORM_FIELD.TAKE_PROFIT_POINT, takeProfitPoint || '');
    setValue(
      FORM_FIELD.STOP_LOSS_POINT,
      stopLossPoint ? -1 * stopLossPoint : ''
    );
  }, [
    commonParoliFunds,
    funds,
    playMode,
    setValue,
    stopLossPoint,
    takeProfitPoint,
  ]);

  const handleCloseModal = () => {
    onClose();
  };

  const handleFormSubmit = (values) => {
    const stopLoss = Number(values[FORM_FIELD.STOP_LOSS_POINT]);
    const takeProfit = Number(values[FORM_FIELD.TAKE_PROFIT_POINT]);
    const newCommonFunds = values[FORM_FIELD.PAROLI_COMMON_FUNDS];

    batch(() => {
      dispatch(setStopLossPoint(-1 * stopLoss));
      dispatch(setTakeProfitPoint(takeProfit));
      if (showSelectMode) {
        dispatch(setPlayMode(values[FORM_FIELD.PLAY_MODE]));
        if (values[FORM_FIELD.PLAY_MODE] === PLAY_MODE.COMMON) {
          dispatch(setCommonParoliFunds(Number(newCommonFunds)));
        } else {
          dispatch(setFunds(Number(personalFunds)));
        }
      }
    });
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

  const personalFundsOptions = (
    <FormControl mt="10px">
      <FormHelperText>3. Vốn</FormHelperText>
      <Select
        backgroundColor="transparent"
        value={personalFunds}
        onChange={(e) => setPersonalFunds(e.target.value)}
      >
        {fundsOptions.reverse().map((fundsValue) => (
          <option key={fundsValue} value={fundsValue}>
            {fundsValue}
          </option>
        ))}
      </Select>
    </FormControl>
  );

  const commonFundsInput = (
    <FormControl mt="10px">
      <InputField
        name={FORM_FIELD.PAROLI_COMMON_FUNDS}
        control={control}
        max={Math.floor(balance)}
        label="3. Vốn"
      />
    </FormControl>
  );

  const playModeOptions = [
    { value: PLAY_MODE.PERSONAL, label: 'Chơi riêng' },
    { value: PLAY_MODE.COMMON, label: 'Chơi chung' },
  ];

  const renderSettingForm = () => (
    <Box className="add-pattern-form" boxShadow="0" px="0">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Text fontWeight="bold">Sửa</Text>
        {renderInputs()}
        {showSelectMode && (
          <RadioField
            name={FORM_FIELD.PLAY_MODE}
            control={control}
            items={playModeOptions}
            onValueChange={setFormPlayMode}
          />
        )}
        {showSelectMode &&
          formPlayMode === PLAY_MODE.PERSONAL &&
          personalFundsOptions}
        {showSelectMode &&
          formPlayMode === PLAY_MODE.COMMON &&
          commonFundsInput}
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

export default RandomAwakenSetting;
