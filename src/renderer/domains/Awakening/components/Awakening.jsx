import {
  Button,
  Center,
  chakra,
  Flex,
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
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import Box from '../../../components/Box';
import {
  deletePattern,
  resetAllPatterns,
  runPatterns,
  toggleActive,
} from '../../../redux/slices/awakeningSlice';
import Candle from '../../Candle';
import Timestamp from '../../Timestamp';
import { PATTERN_TYPE } from '../awakeningUtil';
import { getConditionGroupType } from '../models/awakenPatternUtils';
import AwakenFormModal from './AwakenFormModal';

const Awakening = () => {
  const dispatch = useDispatch();
  const { patternList, totalBetAmount, sumProfit } = useSelector(
    (state) => state.awakening
  );
  const [modalPattern, setModalPattern] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickEdit = (pattern) => {
    setModalPattern(pattern);
    onOpen();
  };

  const tableHeaderTd = (label) => (
    <Th px="1" color="white">
      <Center textAlign="center">{label}</Center>
    </Th>
  );
  const tableRowTd = (element) => (
    <Td px="1">
      <Center>{element}</Center>
    </Td>
  );

  const renderTableButtons = (pattern) => {
    const { type, isActive, id } = pattern;
    const isParoli = type === PATTERN_TYPE.PAROLI;
    const isAutoParoli = type === PATTERN_TYPE.AUTO_PAROLI;
    return (
      <Td px="1">
        <Center>
          <Button
            size="sm"
            w="4vw"
            colorScheme={isActive ? 'red' : 'green'}
            onClick={() => dispatch(toggleActive({ id }))}
          >
            {isActive ? 'Stop' : 'Run'}
          </Button>
          {!isActive && (
            <>
              {!isAutoParoli && (
                <Button
                  size="sm"
                  w="4vw"
                  colorScheme="red"
                  onClick={() => dispatch(deletePattern(id))}
                >
                  Xoá
                </Button>
              )}
              {(isParoli || isAutoParoli) && (
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
    const isAutoParoli = type === PATTERN_TYPE.AUTO_PAROLI;
    const isMartingale = type === PATTERN_TYPE.MARTINGALE;
    const isMiniAwaken = type === PATTERN_TYPE.MINI_AWAKEN;
    return (
      <Box
        className="Awakening"
        bg="transparent"
        color="whiteAlpha.900"
        h="40vh"
        mt="2vh"
        px="0"
        pb="2vh"
        maxHeight="36vh"
        overflowY="scroll"
        borderTop="2px solid #000"
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
          '& thead th': {
            background: '#000000',
            position: 'sticky',
            zIndex: 1,
            top: 0,
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
              {(isMartingale || isMiniAwaken) && tableHeaderTd('Lãi ảo')}
              {tableHeaderTd('Lãi')}
              {tableHeaderTd('Thắng/Thua')}
              {tableHeaderTd('Bước')}
              {(isParoli || isAutoParoli) && (
                <>
                  {tableHeaderTd('Gấp rắn Awaken')}
                  {tableHeaderTd('Hệ số')}
                </>
              )}
              {isMartingale && (
                <>
                  {tableHeaderTd('Gấp thép Awaken')}
                  {tableHeaderTd('Mức thắng')}
                  {tableHeaderTd('Đổi lệnh')}
                </>
              )}
              {isMiniAwaken && (
                <>
                  {tableHeaderTd('Gấp thép Awaken')}
                  {/* {tableHeaderTd('Mini Thua/thắng')} */}
                  {tableHeaderTd('Mức thua(lần)')}
                  {tableHeaderTd('Đổi lệnh')}
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
                  realWinCount,
                  profit,
                  virtualProfit,
                  betAmount,
                  maxWinCount,
                  martingaleWinLoop,
                  martingaleWinLoopPos,
                  miniAwakenLoseList,
                  miniAwakenLosePos,
                  betOrderUpdatedCount,
                  condition,
                } = pattern;

                return (
                  <Tr key={`pattern-${id}`}>
                    {tableRowTd(id)}
                    {tableRowTd(getConditionGroupType(condition))}
                    {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
                    {tableRowTd(renderBetOrderElement(pattern))}
                    {tableRowTd(betAmount)}
                    {(isMartingale || isMiniAwaken) &&
                      tableRowTd(Number(virtualProfit).toFixed(2))}
                    {tableRowTd(Number(profit).toFixed(2))}
                    {tableRowTd(
                      `${
                        isParoli || isAutoParoli ? winCount : realWinCount
                      }/${loseCount}`
                    )}
                    {tableRowTd(betOrders.length)}
                    {(isParoli || isAutoParoli) && (
                      <>
                        {tableRowTd(!betLoop ? '' : betLoop.join('-'))}
                        {tableRowTd(betRatio[betRatioPos])}
                      </>
                    )}
                    {isMartingale && (
                      <>
                        {tableRowTd(maxWinCount || '')}
                        {tableRowTd(martingaleWinLoop[martingaleWinLoopPos])}
                        {tableRowTd(betOrderUpdatedCount)}
                      </>
                    )}
                    {isMiniAwaken && (
                      <>
                        {tableRowTd(maxWinCount || '')}
                        {/* {tableRowTd( */}
                        {/*  `${pattern.miniAwakenLoseCount}/${pattern.miniAwakenWinCount}` */}
                        {/* )} */}
                        {tableRowTd(miniAwakenLoseList[miniAwakenLosePos])}
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
        <Tab>AUTO SĂN RẮN</Tab>
        <Tab>MINI AWAKEN</Tab>
        <Tab>SĂN RẮN</Tab>
      </TabList>
      <TabPanels p="0">
        <TabPanel>{renderMainTable(PATTERN_TYPE.AUTO_PAROLI)}</TabPanel>
        <TabPanel>{renderMainTable(PATTERN_TYPE.MINI_AWAKEN)}</TabPanel>
        <TabPanel>{renderMainTable(PATTERN_TYPE.PAROLI)}</TabPanel>
      </TabPanels>
    </Tabs>
  );

  const renderBetOrderElement = (pattern) => {
    const { betOrders, patternPos, isRunning, isVirtualRun } = pattern;
    const bets = betOrders.map((bet, index) => {
      const isBetting = isRunning && index === patternPos;
      let color = isBetting ? 'yellow.400' : 'white';
      color = isBetting && isVirtualRun ? 'blue.300' : color;
      return (
        <chakra.span
          key={uuidv1()}
          color={color}
          fontWeight={isBetting ? 'bold' : ''}
          lineHeight="1.5"
        >
          {bet.betType ? 'T' : 'G'}
          <Text as="sub" color={color}>
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

  const renderButton = ({ label, colorScheme, onClick, disabled = false }) => (
    <Button
      size="sm"
      ml="2"
      px="2"
      color="white"
      disabled={disabled}
      colorScheme={colorScheme}
      onClick={onClick}
    >
      {label}
    </Button>
  );

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
      <Flex justifyContent="flex-start" py="2" flexWrap="wrap">
        <Flex display="flex" w="100%" justifyContent="center" pb="5">
          <Text color="yellow" px="5">
            Lãi Auto săn rắn: {Number(sumProfit.autoParoli).toFixed(2)}
          </Text>
          <Text color="yellow" px="5">
            Lãi Mini Awaken: {Number(sumProfit.miniAwaken).toFixed(2)}
          </Text>
          <Text color="yellow" px="5">
            Lãi Săn rắn: {Number(sumProfit.paroli).toFixed(2)}
          </Text>
          <Text color="yellow" px="5">
            Tổng lãi: {Number(sumProfit.total).toFixed(2)}
          </Text>
          <Text color="yellow" px="5">
            Tổng cược: {Number(totalBetAmount).toFixed(2)}
          </Text>
        </Flex>
        <AwakenFormModal mode="ADD" />
        {renderButton({
          label: 'Restart',
          colorScheme: 'cyan',
          onClick: () => dispatch(resetAllPatterns()),
        })}
        {renderButton({
          label: 'Run Auto săn rắn',
          colorScheme: 'green',
          onClick: () => dispatch(runPatterns(PATTERN_TYPE.AUTO_PAROLI)),
        })}
        {renderButton({
          label: 'Run Mini Awaken',
          colorScheme: 'green',
          onClick: () => dispatch(runPatterns(PATTERN_TYPE.MINI_AWAKEN)),
        })}
        {renderButton({
          label: 'Run Săn rắn',
          colorScheme: 'green',
          onClick: () => dispatch(runPatterns(PATTERN_TYPE.PAROLI)),
        })}
      </Flex>
      {renderTabs()}
      <AwakenFormModal
        mode="EDIT"
        isOpenModal={isOpen}
        onCloseModal={onClose}
        patternInput={modalPattern}
      />
    </Box>
  );

  return awakenContent();
};

export default Awakening;
