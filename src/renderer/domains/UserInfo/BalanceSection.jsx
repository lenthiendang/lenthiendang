import React from 'react';
import { Flex } from '@chakra-ui/react';
import { GiProfit, GiReceiveMoney, GiTakeMyMoney } from 'react-icons/gi';
import { GrCurrency } from 'react-icons/gr';

import Box from '../../components/Box';
import { formatNumber } from '../../../utils';
import { PropAttr, PropName, PropIcon, PropVal } from './Prop';

const balanceInfos = [
  {
    icon: GrCurrency,
    label: 'Số dư ban đầu',
    attr: 'originalBalance',
  },
  {
    icon: GiTakeMyMoney,
    label: 'Số dư hiện tại',
    attr: 'balance',
  },
  {
    icon: GiReceiveMoney,
    label: 'Tổng lãi',
    attr: 'profit',
    isDecorated: true,
  },
  { icon: GiProfit, label: 'Tổng cược', attr: 'totalBet' },
];

const BalanceSection = ({ account }) => {
  return (
    <Box justify="center">
      {balanceInfos.map((balanceInfo, id) => (
        <PropAttr key={balanceInfo.attr}>
          <PropName
            color={id === 2 ? 'primary.500' : ''}
            fontWeight={id === 2 ? 'bold' : 'medium'}
            fontSize={id === 2 ? 'md' : 'sm'}
          >
            <PropIcon icon={balanceInfo.icon} />
            {balanceInfo.label}:{' '}
          </PropName>
          <PropVal
            fontSize={id === 2 ? '2xl' : 'md'}
            p="0.5"
            borderRadius="md"
            background={
              balanceInfo.isDecorated && account[balanceInfo.attr] >= 0
                ? 'green.300'
                : ''
            }
          >
            {balanceInfo.isDecorated && account[balanceInfo.attr] >= 0
              ? '+'
              : ''}
            {account[balanceInfo.attr] >= 0
              ? formatNumber(account[balanceInfo.attr])
              : 0}
            $
          </PropVal>
        </PropAttr>
      ))}
      <Flex fontSize="xs" fontStyle="italic" justify="flex-end">
        (Hoa hồng: {formatNumber(account.totalBet / 100)}$)
      </Flex>
    </Box>
  );
};

export default BalanceSection;
