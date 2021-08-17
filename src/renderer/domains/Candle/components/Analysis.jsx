import React from 'react';
import { useSelector } from 'react-redux';
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

import CandleAnalysis from './CandleAnalysis';

const Analysis = ({ isOpen, onClose }) => {
  const { list } = useSelector((state) => state.price);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      overflow="hidden"
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="blackAlpha.800" color="whiteAlpha.900">
        <ModalHeader>Bảng phân tích nến</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex w="100%" justify="space-between">
            <CandleAnalysis list={list} />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Analysis;
