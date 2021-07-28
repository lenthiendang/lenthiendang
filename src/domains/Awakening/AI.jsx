import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text } from '@chakra-ui/react';

import Box from '../../components/Box';
import SettingsTrigger from './SettingsTrigger';
import AIButton from './AIButton';
import PatternTable from './PatternTable';
import AIPatterns from '../../class/PatternList';
import { formatNumber } from '../../utils';
import { GiNightSleep, GiBrain } from 'react-icons/gi';

const AI = () => {
  return (
    <Box bg="blackAlpha.800" color="whiteAlpha.900" w="90vw" h="50vh">
      Awakening
    </Box>
  );
};

// let aiPatterns = new AIPatterns();

// const useActive = () => {
//   const [isActive, toggleActive] = useState(false);
//   const { takeProfitPoint, profit, stopLossPoint, accountType } = useSelector((state) => state.account);

//   useEffect(() => {
//     if (accountType === 'LIVE') {
//       toggleActive(false);
//     }
//   }, [accountType]);

//   useEffect(() => {
//     if ((takeProfitPoint && profit >= takeProfitPoint) || (stopLossPoint && profit <= stopLossPoint)) {
//       toggleActive(false);
//     }
//   }, [takeProfitPoint, profit, stopLossPoint]);

//   return { isActive, toggleActive };
// };

// const AI = ({ gridArea }) => {
//   const [patterns, setPatterns] = useState([]);
//   const [profits, setProfits] = useState(0);
//   const { isActive, toggleActive } = useActive();
//   const { list: candles } = useSelector((state) => state.price);

//   const handleActiveAll = () => {
//     toggleActive(!isActive);
//   };

//   const handleActiveOne = (id) => {
//     aiPatterns.toggleActive(id);
//     setPatterns(aiPatterns.list);
//   };

//   useEffect(() => {
//     setPatterns(aiPatterns.list);
//   }, []);

//   useEffect(() => {
//     aiPatterns.checkResult(candles[candles.length - 1].type).start(candles);
//     setPatterns(aiPatterns.list);
//     setProfits(aiPatterns.sumProfit());
//   }, [candles.length]);

//   return (
//     <Box
//       gridArea={gridArea}
//       flexDir="row"
//       align="center"
//       color="whiteAlpha.900"
//       background={`${
//         isActive ? '' : 'linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)), '
//       }url(https://www.uts.edu.au/sites/default/files/styles/full_width_xlarge_2x/public/2019-04/FEIT-AI-machine-learning-section.jpg?itok=26BJSGQQ) center center/cover no-repeat`}
//     >
//       <Text w="100%" textAlign="center" fontSize="xl" color="whiteAlpha.800">
//         Awakening {isActive ? 'đang kích hoạt' : 'đang tạm dừng'} !
//       </Text>

//       <Text>{profits}</Text>
//       <SettingsTrigger
//         patterns={patterns}
//         isActive={isActive}
//         handleActiveAll={handleActiveAll}
//         handleActiveOne={handleActiveOne}
//       />
//       <AIButton isActive={isActive} handleActiveAll={handleActiveAll} />
//     </Box>
//   );
// };

export default AI;
