import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import Box from '../../../components/Box';

const tableStyles = {
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
};

function ParoliRoomList() {
  const { roomList } = useSelector((state) => state.awakening);
  const awakenDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = awakenDisclosure;
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const participants = getParticipants();

  function getParticipants() {
    const participantsData = [];
    roomList.forEach((room) => {
      room.participants.forEach((participant) => {
        participantsData.push({
          roomId: room.roomId,
          isRunning: room.isRunning,
          name: participant.name,
          exchange: participant.exchange,
        });
      });
    });
    return participantsData;
  }

  const roomTable = (
    <Box
      className="Awakening"
      display="flex"
      alignItems="center"
      bg="transparent"
      color="whiteAlpha.900"
      h="40vh"
      mt="2vh"
      px="0"
      pb="2vh"
      maxHeight="36vh"
      overflowY="scroll"
      borderTop="2px solid #000"
      css={tableStyles}
    >
      <Table size="sm">
        <Thead>
          <Tr>
            <Th px="1" color="white">
              <Center textAlign="center">Room-ID</Center>
            </Th>
            <Th px="1" color="white">
              <Center textAlign="center">Trạng thái</Center>
            </Th>
            <Th px="1" color="white">
              <Center textAlign="center">Người chơi</Center>
            </Th>
            <Th px="1" color="white">
              <Center textAlign="center">Sàn</Center>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {participants.map(({ roomId, isRunning, name, exchange }) => (
            <Tr key={`${roomId}-${name}-${exchange}`}>
              <Td px="1">
                <Center>{roomId}</Center>
              </Td>
              <Td px="1">
                <Center>{isRunning ? 'Đang chơi' : 'Đang chờ'}</Center>
              </Td>
              <Td px="1">{name}</Td>
              <Td px="1">{exchange}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );

  return (
    <>
      <Button
        mx="10px"
        colorScheme="yellow"
        color="#350048"
        height="30px"
        onClick={onOpen}
      >
        Room
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="blackAlpha.800" color="whiteAlpha.900">
          <ModalHeader pb="0">
            <Center>Người chơi</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{roomTable}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ParoliRoomList;
