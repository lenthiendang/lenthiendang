import React, { useState } from 'react';
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPattern,
  updatePattern,
} from '../../../redux/slices/awakeningSlice';
import {
  betOrderSingleRegExp,
  convertBetConditionInputToString,
  convertBetOrderStringToObject,
  getNumberToFix,
  PATTERN_FIELD,
  PATTERN_TYPE,
} from '../awakeningUtil';
import AwakenPattern from '../models/AwakenPattern';
import { getConditionGroupType } from '../models/awakenPatternUtils';
import AutoParoliForm from './AutoParoliForm';
import MiniAwakenForm from './MiniAwakenForm';
import ParoliForm from './ParoliForm';
import MartingaleForm from './MartingaleForm';

const initPattern = {
  [PATTERN_FIELD.TYPE]: '',
  [PATTERN_FIELD.CONDITION]: '',
  [PATTERN_FIELD.BET_ORDERS]: '',
  [PATTERN_FIELD.BET_LOOP]: '',
  [PATTERN_FIELD.BET_RATIOS]: '',
  [PATTERN_FIELD.MINI_LOSES]: '',
};

function AwakenFormModal(props) {
  const { mode = 'ADD', isOpenModal, onCloseModal, patternInput } = props;
  const dispatch = useDispatch();
  const isAddMode = mode === 'ADD';
  const candles = useSelector((state) => state.price.list);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pattern] = useState(
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    isAddMode ? initPattern : mapParoliPatternToInputObject(patternInput)
  );

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const mapToNewParoliPattern = (pattern) => {
    const condition = convertBetConditionInputToString(pattern.condition);
    const betLoop = pattern.betLoop.split('-').map((loop) => Number(loop));
    const betRatios = pattern.betRatios
      .split('-')
      .map((ratio) => Number(ratio));
    const betOrders = pattern.betOrders
      .match(betOrderSingleRegExp)
      .map((betOder) => convertBetOrderStringToObject(betOder));

    return {
      condition,
      betOrders,
      betLoop,
      betRatios,
      type: pattern.type,
      isActive: false,
    };
  };

  // use this function to Martingale & MiniAwaken( MiniMartingale)
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const mapToNewMartingalePattern = (pattern) => {
    const betAmounts = pattern.betAmounts.split('-');
    const lastCandles = candles.slice((betAmounts.length + 1) * -1);
    const condition = lastCandles[0].type ? 'T' : 'G';
    const betOrders = lastCandles.slice(1).map((candle, index) => ({
      betType: index === 0 ? candle.type : !candle.type,
      betAmount: Number(betAmounts[index]),
    }));

    const maxWinCount = Number(pattern.maxWinCount || -1);
    const totalBetAmount = betAmounts.reduce(
      (acc, amount) => acc + Number(amount),
      0
    );
    const martingaleWinLoop = pattern.martingaleWinLoop
      ? pattern.martingaleWinLoop
          .split('-')
          .map((percent) =>
            getNumberToFix(Number(percent / 100) * totalBetAmount, 2)
          )
      : [];
    const miniAwakenLoseList = pattern.miniAwakenLoseList
      ? pattern.miniAwakenLoseList.split('-').map((number) => Number(number))
      : [];

    return {
      type: pattern.type,
      maxWinCount,
      condition,
      betOrders,
      martingaleWinLoop,
      miniAwakenLoseList,
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleAddFormSubmit = (pattern) => {
    let newPattern;
    switch (pattern.type) {
      case PATTERN_TYPE.MARTINGALE:
        newPattern = mapToNewMartingalePattern(pattern);
        break;
      case PATTERN_TYPE.AUTO_PAROLI:
        newPattern = mapToNewParoliPattern(pattern);
        break;
      case PATTERN_TYPE.MINI_AWAKEN:
        newPattern = mapToNewMartingalePattern(pattern);
        break;
      default:
        newPattern = mapToNewParoliPattern(pattern);
    }
    dispatch(addPattern(new AwakenPattern(newPattern).getObject()));
    onClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleEditFormSubmit = (pattern) => {
    const newPattern = mapToNewParoliPattern(pattern);
    newPattern.id = patternInput.id;
    dispatch(updatePattern(new AwakenPattern(newPattern).getObject()));
    onCloseModal();
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function mapParoliPatternToInputObject(pattern) {
    const { id, type, condition, betOrders, betLoop, betRatioInit } = pattern;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let patternInput = {};
    if (condition && betOrders && betLoop && betRatioInit) {
      const betLoopInput = Array.isArray(betLoop) ? betLoop.join('-') : betLoop;
      const betRatiosInput = betRatioInit.join('-');
      const conditionInput = getConditionGroupType(condition);
      const betOrdersInput = betOrders
        .map((bet) => `${bet.betType ? 'T' : 'G'}${bet.betAmount}`)
        .join('');

      patternInput = {
        [PATTERN_FIELD.ID]: id,
        [PATTERN_FIELD.TYPE]: type,
        [PATTERN_FIELD.BET_LOOP]: betLoopInput,
        [PATTERN_FIELD.CONDITION]: conditionInput,
        [PATTERN_FIELD.BET_RATIOS]: betRatiosInput,
        [PATTERN_FIELD.BET_ORDERS]: betOrdersInput,
      };
    }
    return patternInput;
  }

  const tabStyles = {
    width: 'calc(33%)',
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'white',
    background: '#22c55e',
  };

  const renderAddForm = () => (
    <Tabs variant="soft-enclosed">
      <TabList flex justifyContent="space-between">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Tab {...tabStyles}>SĂN RẮN</Tab>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Tab {...tabStyles}>GẤP THÉP</Tab>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Tab {...tabStyles}>MINI AWAKEN</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex justify="center" fontWeight="bold">
            SĂN RẮN
          </Flex>
          <ParoliForm
            pattern={{ ...pattern, type: PATTERN_TYPE.PAROLI }}
            onSubmit={handleAddFormSubmit}
          />
        </TabPanel>
        <TabPanel>
          <Flex justify="center" fontWeight="bold">
            GẤP THÉP
          </Flex>
          <MartingaleForm
            pattern={{ ...pattern, type: PATTERN_TYPE.MARTINGALE }}
            onSubmit={handleAddFormSubmit}
          />
        </TabPanel>
        <TabPanel>
          <Flex justify="center" fontWeight="bold">
            MINI AWAKEN
          </Flex>
          <MiniAwakenForm
            pattern={{ ...pattern, type: PATTERN_TYPE.MINI_AWAKEN }}
            onSubmit={handleAddFormSubmit}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );

  const editForm = () => {
    const forms = {
      [PATTERN_TYPE.PAROLI]: (
        <ParoliForm
          mode="EDIT"
          pattern={mapParoliPatternToInputObject(patternInput)}
          onSubmit={handleEditFormSubmit}
        />
      ),
      [PATTERN_TYPE.AUTO_PAROLI]: (
        <AutoParoliForm
          mode="EDIT"
          pattern={mapParoliPatternToInputObject(patternInput)}
          onSubmit={handleEditFormSubmit}
        />
      ),
    };
    return forms[patternInput.type];
  };

  return (
    <>
      {isAddMode && (
        <Button
          size="sm"
          w="5vw"
          mb="3"
          colorScheme="green"
          color="white"
          onClick={onOpen}
        >
          Thêm
        </Button>
      )}
      <Modal
        isOpen={isAddMode ? isOpen : isOpenModal}
        onClose={isAddMode ? onClose : onCloseModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isAddMode ? 'Thêm mẫu' : 'Sửa'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{isAddMode ? renderAddForm() : editForm()}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default React.memo(AwakenFormModal);
