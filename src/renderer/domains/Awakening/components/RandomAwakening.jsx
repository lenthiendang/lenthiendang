import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useCallback, useContext } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import useGetTimestamp from '../../../hooks/useGetTimestamp';
import { resetAccount } from '../../../redux/slices/accountSlice';
import {
  resetAllPatterns,
  runRandomPatterns,
  setProfitResult,
  setTotalBetAmount,
} from '../../../redux/slices/awakeningSlice';
import { SocketContext } from '../../../socket';
import Audio from '../audio';
import { PLAY_MODE } from '../awakeningUtil';
import AwakenAnimation from './AwakenAnimation';
import ParoliRoomList from './ParoliRoomList';
import RandomAwakenSetting from './RandomAwakenSetting';

function RandomAwakening() {
  const dispatch = useDispatch();
  const { isBetSession } = useSelector((state) => state.session);
  const {
    commonParoliRunning,
    funds,
    commonParoliFunds,
    betAmount,
    totalBetAmount,
    sumProfit,
    profitResult,
    patternList,
    playMode,
  } = useSelector((state) => state.awakening);
  const balance = useSelector((state) => state.account.balance);
  const awakenRunning =
    commonParoliRunning || patternList.some((pattern) => pattern.isActive);
  const counter = useGetTimestamp();
  const disableStartButton =
    (!awakenRunning &&
      playMode === PLAY_MODE.COMMON &&
      balance < commonParoliFunds) ||
    (!awakenRunning &&
      playMode === PLAY_MODE.PERSONAL &&
      (!isBetSession || counter < 5 || balance < 10 || !balance));
  // const fundsOptions = useMemo(() => ['', ...VALID_FUNDS], []);
  // const [funds, setFunds] = useState('');
  const betAmountUp = Number(betAmount.up) !== 0 ? `T${betAmount.up}` : '';
  const betAmountDown =
    Number(betAmount.down) !== 0 ? ` G${betAmount.down}` : '';
  const betAmountLabel = `${betAmountUp}${betAmountDown}`;

  const socket = useContext(SocketContext);

  const stopCommonParoli = useCallback(() => {
    socket.emit('AWAKEN_UNREGISTER');
  }, [socket]);

  const runCommonParoli = useCallback(() => {
    const patternAmount = Math.floor(commonParoliFunds);
    socket.emit('AWAKEN_REGISTER', patternAmount);
  }, [commonParoliFunds, socket]);

  const handleStartAwaken = () => {
    if (awakenRunning) {
      if (playMode === PLAY_MODE.COMMON) {
        stopCommonParoli();
      }
      dispatch(resetAllPatterns());
    } else {
      batch(() => {
        dispatch(resetAccount());
        dispatch(setProfitResult(0));
        dispatch(setTotalBetAmount(0));
        if (playMode === PLAY_MODE.COMMON) {
          runCommonParoli();
        } else {
          dispatch(runRandomPatterns(funds !== '' ? Number(funds) : undefined));
        }
      });
      Audio.awaken
        .play()
        .then(() => true)
        .catch((error) => console.log('Audio.awaken error:', error));
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
        {Number(sumProfit.total) !== 0 && (
          <Text color="yellow" pl="10px" fontSize="14px">
            Lãi: {Number(sumProfit.total).toFixed(2)}
          </Text>
        )}
        <Text color="yellow" pl="10px" fontSize="14px">
          Tổng cược: {Number(totalBetAmount).toFixed(2)}
        </Text>
        <ParoliRoomList />
        <Button
          mx="10px"
          colorScheme="yellow"
          color="#350048"
          height="30px"
          disabled={disableStartButton}
          onClick={handleStartAwaken}
        >
          {awakenRunning ? 'Stop' : 'Awaken'}
        </Button>
        <RandomAwakenSetting isRunning={awakenRunning} showSelectMode={false} />
      </Flex>
    </Flex>
  );
}

export default RandomAwakening;
