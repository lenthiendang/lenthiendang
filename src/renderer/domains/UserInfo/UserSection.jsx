import React from 'react';
import { Flex, Avatar, Image } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

import { GiNinjaHead, GiBatMask } from 'react-icons/gi';
import { FaPeopleCarry } from 'react-icons/fa';
import Box from '../../components/Box';
import { PropAttr, PropName, PropIcon, PropVal } from './Prop';
import Subscription from './Subscription';
import roles from '../../../constant/roles';
import defaultAvatar from '../../../../assets/images/defaultAvatar.jpeg';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const userInfos = [
  { icon: GiNinjaHead, label: 'Tên tài khoản', attr: 'name' },
  { icon: FaPeopleCarry, label: 'Người giới thiệu', attr: 'sponsor' },
];

const AvatarBox = ({ url }) => (
  <Flex
    m="auto"
    mr="1.5rem"
    position="relative"
    w="8.8rem"
    h="8.8rem"
    overflow="hidden"
    borderRadius="2xl"
  >
    <Avatar src={url || defaultAvatar} w="8.8rem" h="8.8rem" />
  </Flex>
);

const UserLevel = ({ expiredOn, role, fn }) => {
  return (
    <PropAttr>
      <PropName>
        <PropIcon icon={GiBatMask} />
        Cấp bậc:{' '}
      </PropName>
      <PropVal
        color={roles[role].color}
        textDecoration={role ? '' : 'line-through'}
      >
        {roles[role].label} (F{fn !== null ? fn : ''})
      </PropVal>
    </PropAttr>
  );
};

const UserSection = ({ account }) => {
  return (
    <Box flexDir="row">
      <AvatarBox url={account.photo} />
      <Flex flexDir="column" justify="center">
        {userInfos.map((userInfo) => (
          <PropAttr key={userInfo.attr}>
            <PropName>
              <PropIcon icon={userInfo.icon} />
              {userInfo.label}:{' '}
            </PropName>
            <PropVal>{account[userInfo.attr]}</PropVal>
          </PropAttr>
        ))}
        <UserLevel
          expiredOn={account.expiredOn}
          role={account.role}
          fn={account.fn}
        />
        <Subscription
          expiredOn={account.expiredOn}
          enabled2fa={account.enabled2fa}
        />
      </Flex>
    </Box>
  );
};

export default UserSection;
