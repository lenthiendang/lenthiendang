import React, { useEffect, useState } from 'react';

import { Button, chakra, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import Box from '../../../components/Box';
import { useSelector } from 'react-redux';
import AwakeningInstance from '../models/AwakeningInstance';
import AwakenModal from './AwakenModal';
import { PATTERN_TYPE } from '../awakeningUtil';

const awakeningPatterns = AwakeningInstance.getInstance();


const Awakening = () => {
  const candles = useSelector(state => state.price.list);
  const [modalPattern, setModalPattern] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();


  useEffect(() => {
    if (candles && candles.length > 0) {
      awakeningPatterns.checkResult(candles);
      awakeningPatterns.start(candles);
    }
  }, [candles]);

  const renderMainTable = () => {
    return (
      <Table size="sm">
        <Thead>
          <Tr>
            <Th color="white">ID</Th>
            <Th color="white">Thế nến</Th>
            <Th color="white">Lệnh đặt</Th>
            <Th color="white">Lãi</Th>
            <Th color="white">Thắng/Thua</Th>
            <Th color="white">Bước</Th>
            <Th color="white">Phương pháp</Th>
            <Th color="white">Gấp rắn Awaken</Th>
            <Th color="white">Hệ số</Th>
            <Th color="white">Gấp thép Awaken</Th>
            <Th color="white">Đổi lệnh đặt</Th>
            <Th color="white">Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody>
          {awakeningPatterns.list.map((pattern, index) => {
            const {
              id, type, betLoop, betOrders, isActive, betRatio, betRatioPos,
              loseCount, winCount, profit, maxWinCount, betOrderUpdatedCount,
              conditionGroupType
            } = pattern;

            return (
              <Tr key={`pattern-${index}`}>
                <Td>{id}</Td>
                <Td>{conditionGroupType}</Td>
                <Td>{renderBetOrderElement(pattern)}</Td>
                <Td>{Number(profit).toFixed(2)}</Td>
                <Td>{`${winCount}/${loseCount}`}</Td>
                <Td>{betOrders.length}</Td>
                <Td>{type === PATTERN_TYPE.PAROLI ? 'Awaken săn rắn' : 'Awaken gấp thép'}</Td>
                <Td>{!betLoop ? '' : Array.isArray(betLoop) ? betLoop.join('-') : betLoop}</Td>
                <Td>{betRatio[betRatioPos]}</Td>
                <Td>{maxWinCount || ''}</Td>
                <Td>{betOrderUpdatedCount}</Td>
                <Td>
                  <Button
                    size="sm" w="5vw" colorScheme="green"
                    onClick={e => awakeningPatterns.toggleActive(index)}>
                    {isActive ? 'Stop' : 'Run'}
                  </Button>
                  {!isActive &&
                  <>
                    <Button
                      size="sm" w="5vw" colorScheme="red"
                      onClick={e => awakeningPatterns.deletePattern(index)}>
                      Xoá lệnh
                    </Button>
                    <Button
                      size="sm" w="5vw" bg="green.400" color="black"
                      onClick={() => onClickEdit(pattern)}>
                      Sửa
                    </Button>
                  </>
                  }
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    );
  };

  const onClickEdit = (pattern) => {
    setModalPattern(pattern);
    onOpen();
  };

  const renderBetOrderElement = (pattern) => {
    const { betOrders, patternPos, isRunning } = pattern;
    return betOrders.map(
      (bet, index) => {
        const isBetting = isRunning && index === patternPos;
        return (
          <chakra.span
            key={`${index}-${bet.betAmount}`}
            color={isBetting ? 'yellow.400' : 'white'}
            fontWeight={isBetting ? 'bold' : ''}>
            {bet.betType ? 'T' : 'G'}
            <Text as="sub" color={isBetting ? 'yellow.400' : 'white'}>{bet.betAmount}</Text>
          </chakra.span>
        );
      }
    );
  };

  return (
    <Box
      className="Awakening"
      bg="blackAlpha.800"
      color="whiteAlpha.900"
      w="90vw"
      h="50vh">
      <AwakenModal mode="ADD"/>
      {renderMainTable()}
      <AwakenModal
        mode="EDIT"
        isOpenModal={isOpen}
        onCloseModal={onClose}
        patternInput={modalPattern}
      />
    </Box>
  );
};

export default Awakening;
