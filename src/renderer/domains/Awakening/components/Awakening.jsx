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
  selectPatternList,
  start,
  toggleActive,
} from '../../../redux/slices/awakeningSlice';
import Candle from '../../Candle';
import Timestamp from '../../Timestamp';
import { PATTERN_TYPE } from '../awakeningUtil';
import AwakenModal from './AwakenModal';

const Awakening = () => {
  const dispatch = useDispatch();
  const candles = useSelector((state) => state.price.list);
  const patternList = useSelector(selectPatternList);
  const [modalPattern, setModalPattern] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const awakenDisclosure = useDisclosure();

  useEffect(() => {
    if (candles && candles.length > 0) {
      dispatch(checkResult());
      dispatch(start());
    }
  }, [dispatch, candles]);

  const onClickEdit = (pattern) => {
    setModalPattern(pattern);
    onOpen();
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
              <Th px="1" color="white">
                <Center>ID</Center>
              </Th>
              <Th px="1" color="white">
                <Center>Thế nến</Center>
              </Th>
              <Th px="1" color="white">
                <Center>Lệnh đặt</Center>
              </Th>
              <Th px="1" color="white">
                <Center>Lãi</Center>
              </Th>
              <Th px="1" color="white">
                <Center>Thắng/Thua</Center>
              </Th>
              <Th px="1" color="white">
                <Center>Bước</Center>
              </Th>
              {isParoli && (
                <>
                  <Th px="1" color="white">
                    <Center>Gấp rắn Awaken</Center>
                  </Th>
                  <Th px="1" color="white">
                    <Center>Hệ số</Center>
                  </Th>
                </>
              )}
              {!isParoli && (
                <>
                  <Th px="1" color="white">
                    <Center>Gấp thép Awaken</Center>
                  </Th>
                  <Th px="1" color="white">
                    <Center>Đổi lệnh đặt</Center>
                  </Th>
                </>
              )}
              <Th px="1" color="white">
                <Center>Thao tác</Center>
              </Th>
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
                  isActive,
                  betRatio,
                  betRatioPos,
                  loseCount,
                  winCount,
                  profit,
                  maxWinCount,
                  betOrderUpdatedCount,
                  conditionGroupType,
                } = pattern;

                return (
                  <Tr key={`pattern-${id}`}>
                    <Td px="1">{id}</Td>
                    <Td px="1">
                      <Center>{conditionGroupType}</Center>
                    </Td>
                    {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
                    <Td px="1">{renderBetOrderElement(pattern)}</Td>
                    <Td px="1">{Number(profit).toFixed(2)}</Td>
                    <Td px="1">
                      <Center>{`${winCount}/${loseCount}`}</Center>
                    </Td>
                    <Td px="1">
                      <Center>{betOrders.length}</Center>
                    </Td>
                    {isParoli && (
                      <>
                        <Td px="1">
                          <Center>{!betLoop ? '' : betLoop.join('-')}</Center>
                        </Td>
                        <Td px="1">
                          <Center>{betRatio[betRatioPos]}</Center>
                        </Td>
                      </>
                    )}
                    {!isParoli && (
                      <>
                        <Td px="1">
                          <Center>{maxWinCount || ''}</Center>
                        </Td>
                        <Td px="1">
                          <Center>{betOrderUpdatedCount}</Center>
                        </Td>
                      </>
                    )}
                    <Td px="1">
                      <Center>
                        <Button
                          size="sm"
                          w="4vw"
                          colorScheme="green"
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
                            {isParoli && (
                              <Button
                                size="sm"
                                w="4vw"
                                bg="green.400"
                                color="black"
                                onClick={() => onClickEdit(pattern)}
                              >
                                Sửa
                              </Button>
                            )}
                          </>
                        )}
                      </Center>
                    </Td>
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
      <AwakenModal mode="ADD" />
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
