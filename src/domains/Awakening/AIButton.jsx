/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

import { ButtonWithIcon } from '../../components/Button';
import { GiNightSleep, GiBrain } from 'react-icons/gi';

const AIButton = ({ isActive, handleActiveAll, size }) => {
  const { accountType } = useSelector((state) => state.account);
  return (
    <ButtonWithIcon
      w="36"
      size={size || 'md'}
      colorScheme={isActive ? 'green' : 'red'}
      icon={isActive ? <GiBrain /> : <GiNightSleep />}
      onClick={handleActiveAll}
      isDisabled={accountType === 'LIVE'}
    >
      {isActive ? 'Awakening' : 'Sleeping'}
    </ButtonWithIcon>
  );
};

export default AIButton;
