/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';

import { ButtonWithIcon } from '../../components/Button';
import Settings from './Settings';

const SettingsTrigger = ({ patterns, isActive, handleActiveAll, handleActiveOne }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ButtonWithIcon onClick={onOpen} mx="2" icon={<FiSettings />} w="32">
        Thiết đặt
      </ButtonWithIcon>
      <Settings
        isOpen={isOpen}
        onClose={onClose}
        patterns={patterns}
        isActive={isActive}
        handleActiveAll={handleActiveAll}
        handleActiveOne={handleActiveOne}
      />
    </>
  );
};

export default SettingsTrigger;
