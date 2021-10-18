import React from 'react';
import { useSelector } from 'react-redux';
import { Center, Flex, Heading, Text, Spinner } from '@chakra-ui/react';
// import { shell } from 'electron';

import LoginForm from './LoginForm';

const Loading = ({ status }) => (
  <Center fontSize="sm" flexDir="column" h="100%" mb="10">
    <Spinner size="xl" color="primary.400" />
    <Text mt="4" textAlign="center">
      {status}
    </Text>
  </Center>
);

const LoginRight = () => {
  const { status } = useSelector((state) => state.auth);
  const { isUpdatedVersion, lastestVersion } = useSelector(
    (store) => store.meta
  );

  // const handleUrl = (url) => {
  //   shell.openExternal(url);
  // };

  return (
    <Flex flexDir="column" py="4" px="12" w="100%" pos="relative">
      <Heading fontWeight="medium" p="4" pl="0" color="blackAlpha.800">
        Đăng nhập
      </Heading>
      {status ? (
        <Loading status={status} />
      ) : (
        <LoginForm
          isUpdatedVersion={isUpdatedVersion}
          lastestVersion={lastestVersion.ver}
        />
      )}
      {/* <Text
        position="absolute"
        bottom="1"
        right="2"
        color="blackAlpha.500"
        fontSize="0.6rem"
      >
        <Text
          color={process.env.VERSION === lastestVersion.ver ? 'green' : 'red'}
          as="span"
        >
          Quý khách đang sử dụng phiên bản{' '}
          {process.env.VERSION === lastestVersion.ver ? 'mới nhất' : 'cũ'}.
        </Text>{' '}
        Current.ver {process.env.VERSION}. Lastest.ver {lastestVersion.ver}.
        {process.env.VERSION !== lastestVersion.ver ? (
          <Text>
            Vui lòng cập nhật phiên bản v{lastestVersion.ver} tại{' '}
            <Text
              as="span"
              cursor="pointer"
              color="blue.400"
              fontWeight="bold"
              textDecor="underline"
              onClick={() => handleUrl(lastestVersion.link)}
            >
              đây
            </Text>
          </Text>
        ) : (
          ''
        )}
      </Text> */}
    </Flex>
  );
};

export default LoginRight;
