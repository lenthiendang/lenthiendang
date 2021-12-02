import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToggle } from 'react-use';
import {
  Text,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Spinner,
  Icon,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FaCheckCircle } from 'react-icons/fa';

import Form, { FormControl, FormLabel } from '../../components/Form';
import API from '../../class/API';
import Server from '../../class/Server';
import { setPrivilege } from '../../redux/slices/accountSlice';
import exchange from '../../../constant/exchanges';
import { getSubscribeFee } from '../../../utils';

const SubscriptionForm = () => {
  const {
    account: { name, expiredOn, fn, sponsor },
    auth: { accessToken },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [loading, toggleLoading] = useToggle(false);
  const [isSuccess, toggleSuccess] = useToggle(false);

  const handleComplete = (verifyCode) => {
    const data = {
      verifyCode,
      nickName: exchange.subscribeAccount,
      memo: 'AILenThienDang Payments',
      amount: getSubscribeFee(fn, exchange.subscribeFee),
    };

    const api = new API({ accessToken });
    const transfer = async () => {
      toggleLoading();
      const res = await api.fetchFromExchangeServer('transfer', data);
      if (res) {
        if (res.err_code === 'invalid-2fa-code') {
          setStatus('Mã 2FA sai! Vui lòng thử lại!');
        } else {
          setStatus(`Lỗi ${res.err_code}`);
        }
      } else {
        const transactions = await api.fetchFromExchangeServer('transaction');

        const server = new Server({ accessToken });
        const result = await server.subscribe(
          transactions.c.find((transaction) =>
            transaction.txid.includes('AILenThienDang Payments')
          )
        );
        if (result.status === 'fail') {
          setStatus(result.result);
        } else {
          const res = await server.checkUser({
            name,
            sponsor,
          });
          const { expiredOn, candle, role } = res;
          dispatch(setPrivilege({ expiredOn, role, candle }));

          toggleSuccess();
        }
      }
      toggleLoading();
    };
    transfer();
  };

  return isSuccess ? (
    <Flex alignSelf="center" flexDir="column" align="center">
      <Icon as={FaCheckCircle} color="green.500" w="3rem" h="3rem" />
      <Text fontSize="md" fontWeight="bold" color="green.500">
        Giao dịch thành công!
      </Text>
      <Text fontSize="sm" fontStyle="italic" color="green.500">
        Quý khách đã gia hạn tài khoản đến ngày{' '}
        <strong>{dayjs(expiredOn).format('DD/MM/YYYY')}!</strong>
      </Text>
      <Text fontSize="xs" fontWeight="bold" fontStyle="italic" color="red.500">
        Khởi động lại AI để nạp 1440 nến khởi tạo!
      </Text>
    </Flex>
  ) : (
    <Form mb="8">
      <Text fontSize="xs" color="green.500" fontStyle="italic" py="2">
        * AILenThienDang sẽ charge{' '}
        <strong>{getSubscribeFee(fn, exchange.subscribeFee)}$</strong> (tương
        ứng <strong>30 ngày</strong> sử dụng) từ tài khoản{' '}
        <strong>{process.env.EXCHANGE}</strong> của quý khách! Sau khi gia hạn,
        tài khoản của quý khách sẽ được sử dụng đến ngày{' '}
        <strong>
          {(expiredOn && dayjs(expiredOn).diff(dayjs(new Date())) >= 0
            ? dayjs(expiredOn)
            : dayjs(new Date())
          )
            .add(30, 'd')
            .format('DD/MM/YYYY')}
          !
        </strong>
      </Text>

      <FormControl id="2fa">
        <FormLabel>
          Mã 2FA (Google Authentication)
          <Text as="div" fontSize="xs" fontWeight="medium" color="green.500">
            * Hệ thống sẽ tự động thanh toán ngay sau khi quý khách nhập xong mã
          </Text>{' '}
        </FormLabel>
        <HStack justify="center">
          {loading ? (
            <Spinner size="lg" color="primary.500" />
          ) : (
            <PinInput
              otp
              colorScheme="primary"
              focusBorderColor="primary.400"
              onComplete={handleComplete}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <PinInputField key={num} />
              ))}
            </PinInput>
          )}
        </HStack>
      </FormControl>
      {status ? (
        <Text mt="1" fontSize="xs" fontWeight="bold" color="red.400">
          {status}
        </Text>
      ) : (
        ''
      )}
      {/* <SubmitButton>Gia hạn</SubmitButton> */}
    </Form>
  );
};

export default SubscriptionForm;
