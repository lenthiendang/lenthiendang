import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkResult,
  startBet,
  updateAutoParoliPatternList,
  updatePatternList,
} from '../../../redux/slices/awakeningSlice';
import Awakening from './Awakening';

function MainLayout() {
  const dispatch = useDispatch();
  const candles = useSelector((state) => state.price.list);
  const awakenDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = awakenDisclosure;

  useEffect(() => {
    dispatch(updatePatternList());
  }, [dispatch]);

  useEffect(() => {
    if (candles && candles.length > 0) {
      dispatch(checkResult());
      dispatch(updateAutoParoliPatternList());
      dispatch(startBet());
    }
  }, [dispatch, candles]);

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
          <ModalBody>
            <Awakening />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default React.memo(MainLayout);
