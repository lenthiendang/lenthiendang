import {
  Button,
  Center,
  chakra,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '../../../components/Box';
import {
  checkResult,
  deletePattern,
  resetAllPatterns,
  selectPatternList,
  startBet,
  toggleActive,
} from '../../../redux/slices/awakeningSlice';
import Candle from '../../Candle';
import Timestamp from '../../Timestamp';
import { PATTERN_TYPE } from '../awakeningUtil';
import AwakenModal from './AwakenModal';

const Awakening = () => {
  const dispatch = useDispatch();
  const candles = useSelector((state) => state.price.list);
  const { patternList, totalBetAmount, sumProfit } = useSelector(
    (state) => state.awakening
  );
  const [modalPattern, setModalPattern] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const awakenDisclosure = useDisclosure();

  useEffect(() => {
    if (candles && candles.length > 0) {
      dispatch(checkResult());
      dispatch(startBet());
    }
  }, [dispatch, candles]);

  const onClickEdit = (pattern) => {
    setModalPattern(pattern);
    onOpen();
  };

  const tableHeaderTd = (label) => (
    <Th px="1" color="white">
      <Center>{label}</Center>
    </Th>
  );
  const tableRowTd = (element) => (
    <Td px="1">
      <Center>{element}</Center>
    </Td>
  );

  const renderTableButtons = (pattern) => {
    const { type, isActive, id } = pattern;
    return (
      <Td px="1">
        <Center>
          <Button
            size="sm"
            w="4vw"
            colorScheme={isActive ? 'red' : 'green'}
            onClick={() => dispatch(toggleActive(id))}
          >
            {isActive ? 'Stop' : 'Run'}
          </Button>
          {!isActive && (
            <>
              <Button
                size="sm"
                w="4vw"
                colorScheme="red"
                onClick={() => dispatch(deletePattern(id))}
              >
                Xoá
              </Button>
              {type === PATTERN_TYPE.PAROLI && (
                <Button
                  size="sm"
                  w="4vw"
                  colorScheme="cyan"
                  color="white"
                  onClick={() => onClickEdit(pattern)}
                >
                  Sửa
                </Button>
              )}
            </>
          )}
        </Center>
      </Td>
    );
  };

  const renderMainTable = (type = PATTERN_TYPE.PAROLI) => {
    const isParoli = type === PATTERN_TYPE.PAROLI;
    return (
      <Box
        className="Awakening"
        bg="transparent"
        color="whiteAlpha.900"
        h="40vh"
        px="0"
        py="2vh"
        maxHeight="40vh"
        overflowY="scroll"
        css={{
          '&::-webkit-scrollbar': {
            width: '1px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '24px',
          },
        }}
      >
        <Table size="sm">
          <Thead>
            <Tr>
              {tableHeaderTd('ID')}
              {tableHeaderTd('Thế nến')}
              {tableHeaderTd('Lệnh đặt')}
              {tableHeaderTd('Tổng cược')}
              {tableHeaderTd('Lãi')}
              {tableHeaderTd('Thắng/Thua')}
              {tableHeaderTd('Bước')}
              {isParoli && (
                <>
                  {tableHeaderTd('Gấp rắn Awaken')}
                  {tableHeaderTd('Hệ số')}
                </>
              )}
              {!isParoli && (
                <>
                  {tableHeaderTd('Gấp thép Awaken')}
                  {tableHeaderTd('Đổi lệnh đặt')}
                </>
              )}
              {tableHeaderTd('Thao tác')}
            </Tr>
          </Thead>
          <Tbody>
            {patternList
              .filter((pattern) => pattern.type === type)
              .map((pattern) => {
                const {
                  id,
                  betLoop,
                  betOrders,
                  betRatio,
                  betRatioPos,
                  loseCount,
                  winCount,
                  profit,
                  betAmount,
                  maxWinCount,
                  betOrderUpdatedCount,
                  conditionGroupType,
                } = pattern;

                return (
                  <Tr key={`pattern-${id}`}>
                    {tableRowTd(id)}
                    {tableRowTd(conditionGroupType)}
                    {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
                    {tableRowTd(renderBetOrderElement(pattern))}
                    {tableRowTd(betAmount)}
                    {tableRowTd(Number(profit).toFixed(2))}
                    {tableRowTd(`${winCount}/${loseCount}`)}
                    {tableRowTd(betOrders.length)}
                    {isParoli && (
                      <>
                        {tableRowTd(!betLoop ? '' : betLoop.join('-'))}
                        {tableRowTd(betRatio[betRatioPos])}
                      </>
                    )}
                    {!isParoli && (
                      <>
                        {tableRowTd(maxWinCount || '')}
                        {tableRowTd(betOrderUpdatedCount)}
                      </>
                    )}
                    {renderTableButtons(pattern)}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    );
  };

  const renderTabs = () => (
    <Tabs
      isFitted
      variant="enclosed"
      bg="transparent"
      colorScheme="yellow"
      h="50vh"
      width="100%"
      px="0"
      py="0"
    >
      <TabList>
        <Tab>AWAKEN SĂN RẮN</Tab>
        <Tab>AWAKEN GẤP THÉP</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{renderMainTable(PATTERN_TYPE.PAROLI)}</TabPanel>
        <TabPanel>{renderMainTable(PATTERN_TYPE.MARTINGALE)}</TabPanel>
      </TabPanels>
    </Tabs>
  );

  const renderBetOrderElement = (pattern) => {
    const { id, betOrders, patternPos, isRunning } = pattern;
    const bets = betOrders.map((bet, index) => {
      const isBetting = isRunning && index === patternPos;
      return (
        <chakra.span
          key={`${id}${bet.betType ? 'T' : 'G'}-${bet.betAmount}`}
          color={isBetting ? 'yellow.400' : 'white'}
          fontWeight={isBetting ? 'bold' : ''}
          lineHeight="1.5"
        >
          {bet.betType ? 'T' : 'G'}
          <Text as="sub" color={isBetting ? 'yellow.400' : 'white'}>
            {bet.betAmount}
          </Text>
        </chakra.span>
      );
    });
    return (
      <Flex justifyContent="center" flexWrap="wrap" maxWidth="42vh">
        {bets}
      </Flex>
    );
  };

  const awakenContent = () => (
    <Box
      className="awakenContent"
      bg="transparent"
      color="whiteAlpha.900"
      px="2vh"
    >
      <Center>
        <Timestamp />
      </Center>
      <Center>
        <Candle />
      </Center>
      <Flex justifyContent="flex-start">
        <AwakenModal mode="ADD" />
        <Button
          size="sm"
          ml="2"
          w="5vw"
          color="white"
          colorScheme="cyan"
          onClick={() => dispatch(resetAllPatterns())}
        >
          Restart
        </Button>
        <Text color="yellow" px="10">
          Tổng cược Awaken: {Number(totalBetAmount).toFixed(2)}
        </Text>
        <Text color="yellow" px="10">
          Tổng lãi Awaken: {Number(sumProfit).toFixed(2)}
        </Text>
      </Flex>
      {renderTabs()}
      <AwakenModal
        mode="EDIT"
        isOpenModal={isOpen}
        onCloseModal={onClose}
        patternInput={modalPattern}
      />
    </Box>
  );

  const awakeningModal = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { isOpen, onOpen, onClose } = awakenDisclosure;
    return (
      <>
        <Button colorScheme="green" onClick={onOpen}>
          Awaken
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay />
          <ModalContent bg="blackAlpha.800" color="whiteAlpha.900">
            <ModalHeader pb="0">
              <Center>AWAKENING</Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>{awakenContent()}</ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

  return <>{awakeningModal()}</>;
};

export default Awakening;
