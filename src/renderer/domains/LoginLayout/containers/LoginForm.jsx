import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Checkbox } from '@chakra-ui/react';

// import Form, { FormControl, FormLabel } from '../../../components/Form';
import Form, { FormControl, FormLabel, Input } from '../../../components/Form';
import { getTokenWithBrowser } from '../../../redux/slices/authSlice';

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(getTokenWithBrowser(data));
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} flexDir="column" justify="center">
      <FormControl id="email" my="4">
        <FormLabel color="primary.500">Địa chỉ email</FormLabel>
        <Input
          type="email"
          borderColor="primary.500"
          placeholder="Email"
          isRequired
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('email')}
        />
      </FormControl>
      <Checkbox colorScheme="primary" defaultIsChecked isDisabled>
        Mở trình duyệt web song song
      </Checkbox>{' '}
      <Button type="submit" colorScheme="primary" mx="auto" my="4">
        Đăng nhập
      </Button>
    </Form>
  );
  // }
  // return (
  //   <Text color="red" fontSize="sm">
  //     {/* <div>
  //       Quý khách đang sử dụng phiên bản cũ (
  //       <strong> v{process.env.VERSION}</strong>).
  //     </div>
  //     <div>
  //       Vui lòng nâng cấp lên phiên bản mới nhất (
  //       <strong>v{lastestVersion}</strong>) để tiếp tục sử dụng!
  //     </div> */}
  //   </Text>
  // );
};

export default LoginForm;
