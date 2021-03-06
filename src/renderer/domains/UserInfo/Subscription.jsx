import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaRegClock } from 'react-icons/fa';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

import SubscriptionForm from './SubscriptionForm';
import { PropAttr, PropName, PropIcon, PropVal } from './Prop';
import User from '../../class/User';
import exchange from '../../../constant/exchanges';
import { getSubscribeFee } from '../../../utils';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const SubscriptionBox = ({ isOpen, onClose, enabled2fa }) => {
  const [walletBalance, setWalletBalance] = useState(undefined);
  const [availableBalance, setAvailableBalance] = useState(undefined);
  const {
    auth: { accessToken },
    account: { fn },
  } = useSelector((state) => state);
  useEffect(() => {
    if (isOpen) {
      const user = new User({ accessToken });
      const getWalletBalance = async () => {
        const res = await user.getWalletBalance();
        setWalletBalance(res[exchange.walletLabel]);
        setAvailableBalance(res.availableBalance);
      };
      getWalletBalance();
    }
  }, [isOpen]);

  const getForm = () => {
    const minFee = getSubscribeFee(fn, exchange.subscribeFee);
    return <SubscriptionForm onClose={onClose} />;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="3xl" pb="0">
          Gia hạn sử dụng
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="6">{getForm()}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Subscription = ({ expiredOn, enabled2fa }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SubscriptionBox
        isOpen={isOpen}
        onClose={onClose}
        enabled2fa={enabled2fa}
      />
      <PropAttr>
        <PropName>
          <PropIcon icon={FaRegClock} />
          Hết hạn:
        </PropName>
        <PropVal
          color={
            expiredOn && dayjs(expiredOn).diff(new Date()) > 0
              ? 'green.400'
              : 'red.400'
          }
          align="center"
        >
          {expiredOn
            ? dayjs(expiredOn).format('HH:mm DD/MM/YY')
            : 'Chưa kích hoạt'}
          <Button onClick={onOpen} colorScheme="primary" size="xs" ml="1">
            Gia hạn
          </Button>
        </PropVal>
      </PropAttr>
      {expiredOn ? (
        <Flex fontSize="xs" fontStyle="italic" justify="flex-end">
          ({dayjs(expiredOn).diff(new Date()) < 0 ? 'Đã hết hạn ' : ''}
          {dayjs(expiredOn).fromNow()})
        </Flex>
      ) : (
        ''
      )}
    </>
  );
};

export default Subscription;
