import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import {
  resetAllPatterns,
  runRandomPatterns,
  setProfitResult,
  setTotalBetAmount,
} from '../../../redux/slices/awakeningSlice';
import Audio from '../audio';
import { VALID_FUNDS } from '../awakeningUtil';
import AwakenAnimation from './AwakenAnimation';
import RandomAwakenSetting from './RandomAwakenSetting';

function RandomAwakening() {
  const dispatch = useDispatch();
  const { betAmount, totalBetAmount, sumProfit, profitResult, patternList } =
    useSelector((state) => state.awakening);
  const balance = useSelector((state) => state.account.balance);
  const awakenRunning = patternList.some((pattern) => pattern.isActive);
  const fundsOptions = ['', ...VALID_FUNDS];
  const [funds, setFunds] = useState('');
  const betAmountUp = Number(betAmount.up) !== 0 ? `T${betAmount.up}` : '';
  const betAmountDown =
    Number(betAmount.down) !== 0 ? ` G${betAmount.down}` : '';
  const betAmountLabel = `${betAmountUp}${betAmountDown}`;

  const handleRandomAwaken = () => {
    if (awakenRunning) {
      dispatch(resetAllPatterns());
    } else {
      batch(() => {
        dispatch(setProfitResult(0));
        dispatch(setTotalBetAmount(0));
        dispatch(runRandomPatterns(funds !== '' ? Number(funds) : undefined));
      });
      // eslint-disable-next-line promise/catch-or-return,promise/always-return
      Audio.awaken.play();
    }
  };

  return (
    <Flex
      className="RandomAwakening"
      width="900px"
      height="70px"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="#350048"
      border="1px solid #FFF"
      borderRadius="5px"
      px="20px"
    >
      <AwakenAnimation enabled={awakenRunning} />
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        backgroundColor="transparent"
        color="#FFF"
        width="500px"
      >
        {betAmountLabel.length > 0 && (
          <>
            <Text fontWeight="bold" p="0 5px 0 10px" fontSize="14px">
              Đặt
            </Text>
            <Text fontSize="14px">{betAmountLabel}</Text>
          </>
        )}
        {!awakenRunning && profitResult !== 0 && (
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
          disabled={!(balance && balance >= 10)}
          onClick={handleRandomAwaken}
        >
          {awakenRunning ? 'Stop' : 'Awaken'}
        </Button>
        <RandomAwakenSetting
          isRunning={awakenRunning}
          funds={funds}
          setFunds={setFunds}
          fundsOptions={fundsOptions}
        />
      </Flex>
    </Flex>
  );
}

export default RandomAwakening;
