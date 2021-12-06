/* eslint-disable no-console */
import { useEffect, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCommonParoliRoom,
  addPatternList,
  runCommonParoliPatterns,
  setCommonParoliRunning,
  setToggleCommonParoli,
} from '../../../redux/slices/awakeningSlice';

import { SocketContext } from '../../../socket';
import { getCommonParoliPattern, PATTERN_TYPE } from '../awakeningUtil';

// TESTING
const useSocket = () => {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const {
    commonParoliFunds,
    patternList,
    commonParoliRunning,
    toggleCommonParoli,
  } = useSelector(
    (state) => state.awakening
  );
  const hasCommonParoli = patternList.some(
    (pattern) => pattern.type === PATTERN_TYPE.COMMON_PAROLI
  );

  const runCommonParoli = useCallback(() => {
    const patternAmount = Math.floor(commonParoliFunds);
    socket.emit('AWAKEN_REGISTER', patternAmount);
  }, [socket, commonParoliFunds]);

  useEffect(() => {
    if (commonParoliRunning) {
      dispatch(setToggleCommonParoli(true));
    }
  }, [dispatch, commonParoliRunning]);

  useEffect(() => {
    if (commonParoliRunning && !hasCommonParoli) {
      socket.emit('AWAKEN_UNREGISTER');
      runCommonParoli();
    }
  }, [socket, hasCommonParoli, runCommonParoli, commonParoliRunning]);

  useEffect(() => {
    if (!toggleCommonParoli) {
      socket.emit('AWAKEN_UNREGISTER');
    }
  },[dispatch, toggleCommonParoli])

  const getCommonParoliList = (registerData) => {
    const commonParoliList = [];
    registerData.forEach((genData) => {
      const { snakeLength, roomId } = genData;
      genData.patternIndexes.forEach((patternIdx) => {
        const newPattern = getCommonParoliPattern({
          roomId,
          length: snakeLength,
          index: patternIdx,
        });
        commonParoliList.push(newPattern);
      });
    });
    return commonParoliList;
  };

  useEffect(() => {
    // Response của server khi client đăng ký rắn
    socket.on('AWAKEN_REGISTER_RESPONSE', (data) => {
      console.log('AWAKEN_REGISTER_RESPONSE', data);
      const responseData = data.data || [];
      if (data && responseData.length > 0) {
        const commonParoliList = getCommonParoliList(responseData);
        dispatch(addPatternList(commonParoliList, PATTERN_TYPE.COMMON_PAROLI));
        dispatch(setCommonParoliRunning(true));
      } else {
        dispatch(setCommonParoliRunning(false));
      }
    });

    // #Testing: Thông tin rắn mỗi phiên
    socket.on('AWAKEN_INFO', (room) => {
      console.log('AWAKEN_INFO', room);
      dispatch(addCommonParoliRoom(room));
      if (room.isRunning) {
        dispatch(runCommonParoliPatterns(room.roomId));
      }
    });

    socket.on('disconnect', (info) => {
      console.log(info);
    });
    return () => socket.disconnect();
  }, [dispatch, socket]);
};

export default useSocket;
