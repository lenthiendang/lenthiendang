import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs,
  useDisclosure
} from '@chakra-ui/react';
import {
  addPattern,
  updatePattern
} from "../../../redux/slices/awakeningSlice";
import {
  betOrderSingleRegExp,
  convertBetConditionInputToString,
  convertBetOrderStringToObject,
  PATTERN_FIELD,
  PATTERN_TYPE
} from '../awakeningUtil';
import AwakenPattern from '../models/AwakenPattern';
import { useDispatch, useSelector } from "react-redux";
import ParoliForm from './ParoliForm';
import MartingaleForm from './MartingaleForm';

const initPattern = {
  [PATTERN_FIELD.TYPE]: PATTERN_TYPE.PAROLI,
  [PATTERN_FIELD.CONDITION]: '',
  [PATTERN_FIELD.BET_ORDERS]: '',
  [PATTERN_FIELD.BET_LOOP]: '',
  [PATTERN_FIELD.BET_RATIOS]: ''
};

function AwakenModal(props) {
  const dispatch = useDispatch()
  const { mode = 'ADD', isOpenModal, onCloseModal, patternInput } = props;
  const isAddMode = mode === 'ADD';
  const candles = useSelector(state => state.price.list);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pattern, setPattern] = useState(isAddMode
    ? initPattern : mapParoliPatternToInputObject(patternInput));


  const handleAddFormSubmit = (pattern) => {
    const newPattern = pattern.type === PATTERN_TYPE.PAROLI
      ? mapToNewParoliPattern(pattern)
      : mapToNewMartingalePattern(pattern);
    dispatch(addPattern(new AwakenPattern(newPattern).getObject()))
    onClose();
  };

  const handleEditFormSubmit = (pattern) => {
    console.log(pattern);
    const newPattern = mapToNewParoliPattern(pattern)
    newPattern.id = patternInput.id;
    dispatch(updatePattern(new AwakenPattern(newPattern).getObject()))
    onCloseModal();
  };

  const mapToNewParoliPattern = (pattern) => {
    const condition = convertBetConditionInputToString(pattern.condition);
    const betLoop = pattern.betLoop.split('-').map(loop => Number(loop));
    const betRatios = pattern.betRatios.split('-').map(ratio => Number(ratio));
    const betOrders = pattern.betOrders
      .match(betOrderSingleRegExp)
      .map(betOder => convertBetOrderStringToObject(betOder));

    return {
      condition,
      betOrders,
      betLoop,
      betRatios,
      type: PATTERN_TYPE.PAROLI,
      isActive: false
    };
  };

  const mapToNewMartingalePattern = (pattern) => {
    const maxWinCount = Number(pattern.maxWinCount);
    const betAmounts = pattern.betAmounts.split('-');
    const lastCandles = candles.slice((betAmounts.length + 1) * -1);
    const condition = lastCandles[0].type ? 'T' : 'G';
    const betOrders = lastCandles.slice(1).map(
      (candle, index) => ({
        betType: index === 0 ? candle.type : !candle.type,
        betAmount: Number(betAmounts[index])
      }));

    return {
      type: PATTERN_TYPE.MARTINGALE,
      maxWinCount,
      condition,
      betOrders
    };
  };

  function mapParoliPatternToInputObject(pattern) {
    const { id, conditionGroupType, betOrders, betLoop, betRatioInit } = pattern;
    let patternInput = {};
    if (conditionGroupType && betOrders && betLoop && betRatioInit) {
      const betLoopInput = Array.isArray(betLoop) ? betLoop.join('-') : betLoop;
      const betRatiosInput = betRatioInit.join('-');
      const conditionInput = conditionGroupType;
      const betOrdersInput = betOrders
        .map((bet) => `${bet.betType ? 'T' : 'G'}${bet.betAmount}`).join('');

      patternInput = {
        [PATTERN_FIELD.ID]: id,
        [PATTERN_FIELD.TYPE]: PATTERN_TYPE.PAROLI,
        [PATTERN_FIELD.BET_LOOP]: betLoopInput,
        [PATTERN_FIELD.CONDITION]: conditionInput,
        [PATTERN_FIELD.BET_RATIOS]: betRatiosInput,
        [PATTERN_FIELD.BET_ORDERS]: betOrdersInput
      };
    }
    return patternInput;
  }


  const renderFormTabs = () => (
    <Tabs variant="soft-rounded" colorScheme="green">
      <TabList>
        <Tab>AWAKEN SĂN RẮN</Tab>
        <Tab>AWAKEN GẤP THÉP</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ParoliForm
            pattern={pattern}
            onSubmit={handleAddFormSubmit}
          />
        </TabPanel>
        <TabPanel>
          <MartingaleForm
            pattern={{ ...pattern, type: PATTERN_TYPE.MARTINGALE }}
            onSubmit={handleAddFormSubmit}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );

  return (
    <>
      {isAddMode &&
      <Button size="sm" w="5vw" bg="green.400" color="black" onClick={onOpen}>
        Thêm mẫu
      </Button>
      }
      <Modal isOpen={isAddMode ? isOpen : isOpenModal} onClose={isAddMode ? onClose : onCloseModal}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>{isAddMode ? 'Thêm mẫu' : 'Sửa'}</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            {isAddMode
              ? renderFormTabs()
              : (
                <ParoliForm
                  mode='EDIT'
                  pattern={mapParoliPatternToInputObject(patternInput)}
                  onSubmit={handleEditFormSubmit}
                />
              )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default React.memo(AwakenModal);