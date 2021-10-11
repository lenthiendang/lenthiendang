import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  runRandomPatterns,
  resetAllPatterns,
  setProfitResult,
} from '../../../redux/slices/awakeningSlice';
import Audio from '../audio';
import { VALID_FUNDS } from '../awakeningUtil';
import AwakeningDialog from './AwakeningDialog';
import RandomAwakenSetting from './RandomAwakenSetting';

export default function RandomAwakening() {
  const dispatch = useDispatch();
  const { patternList, betAmount, totalBetAmount, sumProfit, profitResult } =
    useSelector((state) => state.awakening);
  const isRunning = patternList.some((pattern) => pattern.isActive === true);
  const originalBalance = useSelector((state) => state.account.originalBalance);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const fundsOptions = ['', ...VALID_FUNDS];
  const [funds, setFunds] = useState('');
  const betAmountLabel =
    Number(betAmount) >= 0 ? `T${betAmount}` : `G${-1 * Number(betAmount)}`;

  const handleRandomAwaken = () => {
    if (isRunning) {
      batch(() => {
        dispatch(resetAllPatterns());
      });
    } else {
      dispatch(setProfitResult(0));
      dispatch(runRandomPatterns(funds !== '' ? Number(funds) : undefined));
      // eslint-disable-next-line promise/catch-or-return,promise/always-return
      Audio.awaken.play().then(() => {});
    }
  };

  return (
    <Flex
      className="RandomAwakening"
      width="900px"
      height="70px"
      flexDirection="row"
      alignItems="center"
      backgroundColor="#350048"
      border="1px solid #FFF"
      borderRadius="5px"
      px="20px"
    >
      <AwakeningDialog backgroundColor="transparent" enabled={isRunning} />
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        backgroundColor="transparent"
        color="#FFF"
        width="500px"
      >
        {Number(betAmount) !== 0 && (
          <>
            <Text fontWeight="bold" p="0 5px 0 10px" fontSize="14px">
              Đặt
            </Text>
            <Text fontSize="14px">{betAmountLabel}</Text>
          </>
        )}
        {!isRunning && profitResult !== 0 && (
          <Text color="yellow" fontWeight="bold" pl="10px" fontSize="14px">
            {`${profitResult > 0 ? 'Thắng ' : 'Thua '} ${profitResult}`}
          </Text>
        )}
        {Number(sumProfit.miniAwaken) !== 0 && (
          <Text color="yellow" pl="10px" fontSize="14px">
            Lãi: {Number(sumProfit.miniAwaken).toFixed(2)}
          </Text>
        )}
        <Text color="yellow" pl="10px" fontSize="14px">
          Tổng đặt: {Number(totalBetAmount).toFixed(2)}
        </Text>
        <Button
          mx="10px"
          colorScheme="yellow"
          color="#350048"
          height="30px"
          disabled={!(originalBalance && originalBalance >= 10)}
          onClick={handleRandomAwaken}
        >
          {isRunning ? 'Stop' : 'Awaken'}
        </Button>
        <RandomAwakenSetting
          isRunning={isRunning}
          funds={funds}
          setFunds={setFunds}
          fundsOptions={fundsOptions}
        />
      </Flex>
    </Flex>
  );
}
