import React, { useState, useEffect } from 'react';
import { useToggle } from 'react-use';
import { Flex, Text, Image, Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { changeAccountType } from '../../redux/slices/accountSlice';
// import { theme } from '../../styles';
// import aiSticker from '../../../assets/images/aiSticker.png';
// import getTeamLogo from '../../utils/getLogo';

// const logo = getTeamLogo();

const AccountType = () => {
  const [type, setType] = useState('DEMO');
  const [isActive, toggleActive] = useToggle(false);
  const dispatch = useDispatch();
  const { expiredOn } = useSelector((store) => store.account);

  useEffect(() => {
    if (expiredOn && dayjs(expiredOn).diff(dayjs()) > 0) {
      toggleActive(true);
    } else {
      toggleActive(false);
    }
  }, [expiredOn, toggleActive]);

  const handleChange = (event) => {
    setType(event.target.value);
    dispatch(changeAccountType(event.target.value));
  };

  return (
    <Select bg="whiteAlpha.900" value={type} onChange={handleChange}>
      <option value="DEMO">DEMO</option>

      {isActive ? (
        <option value="LIVE">LIVE</option>
      ) : (
        <option value="null" disabled>
          LIVE (Vui lòng gia hạn tài khoản)
        </option>
      )}
    </Select>
    // <StyledForm>
    //   <StyledLabel id="accountType">Tài khoản</StyledLabel>
    //   <Select
    //     labelId="accountType"
    //     id="accountType"
    //     value={type}
    //     onChange={handleChange}
    //   >
    //     <MenuItem value="DEMO">DEMO</MenuItem>

    //     {isActive ? (
    //       <MenuItem value="LIVE">LIVE</MenuItem>
    //     ) : (
    //       <MenuItem value="null" disabled>
    //         LIVE (Vui lòng gia hạn tài khoản)
    //       </MenuItem>
    //     )}
    //   </Select>
    // </StyledForm>
  );
};

const Header = ({ gridArea }) => {
  return (
    <Flex gridArea={gridArea} justify="space-between" my="2">
      {/* <Flex align="center">
        <Image
          src={aiSticker}
          h="13rem"
          position="relative"
          objectFit="cover"
        />
        <Flex
          position="relative"
          left="-1.2rem"
          top="0.9rem"
          color="white"
          fontWeight="bold"
          align="center"
        >
          v{process.env.VERSION}
          <Text color="whiteAlpha.500" fontSize="xs" fontWeight="medium" ml="2">
            with
          </Text>
        </Flex>
        <Image
          src={logo}
          h="6.5rem"
          w="13rem"
          alignSelf="flex-end"
          position="relative"
          bottom="-0.4rem"
          objectFit="contain"
          objectPosition="center left"
        />
      </Flex> */}
      <AccountType />
    </Flex>
  );
};

export default Header;
