/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Flex,
  Button,
} from '@chakra-ui/react';

import PatternTable from './PatternTable';
import AIButton from './AIButton';
import { ButtonWithIcon } from '../../components/Button';
import { GiNightSleep, GiBrain } from 'react-icons/gi';

const Settings = ({ isOpen, onClose, patterns, isActive, handleActiveAll, handleActiveOne }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
      <ModalOverlay />
      <ModalContent
        color="whiteAlpha.900"
        background="linear-gradient(
          rgba(0, 0, 0, 0.4),
          rgba(0, 0, 0, 0.4)
        ),
        url(https://www.uts.edu.au/sites/default/files/styles/full_width_xlarge_2x/public/2019-04/FEIT-AI-machine-learning-section.jpg?itok=26BJSGQQ) center center/cover no-repeat"
      >
        <ModalHeader>Awakening AI</ModalHeader>
        <ModalCloseButton />
        <ModalBody minHeight="60">
          <PatternTable patterns={patterns} isActive={isActive} handleActiveOne={handleActiveOne} />
        </ModalBody>

        <ModalFooter>
          <AIButton size="lg" isActive={isActive} handleActiveAll={handleActiveAll} />
          <Button colorScheme="primary" size="lg" onClick={onClose} mx="3">
            Đồng ý
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Settings;
