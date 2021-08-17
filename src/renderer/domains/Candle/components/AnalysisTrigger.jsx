import React from 'react';
import { useSelector } from 'react-redux';
import { useDisclosure, Flex } from '@chakra-ui/react';
import { RiBarChartGroupedFill } from 'react-icons/ri';

import { ButtonWithIcon } from '../../../components/Button';
import Analysis from './Analysis';

const AnalysisTrigger = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { list } = useSelector((state) => state.price);
  return (
    <Flex>
      <ButtonWithIcon
        onClick={onOpen}
        icon={<RiBarChartGroupedFill />}
        size="sm"
        colorScheme="primary"
        mx="4"
        mr="10"
      >
        Phân tích {Object.entries(list).length} nến{' '}
      </ButtonWithIcon>
      <Analysis isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default AnalysisTrigger;
