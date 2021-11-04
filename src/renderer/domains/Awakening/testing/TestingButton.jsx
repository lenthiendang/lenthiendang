import { Button } from '@chakra-ui/button';
import React, { useContext } from 'react';
import { SocketContext } from '../../../socket';

const PATTERNS_AMOUNT = 1;

const TestingButton = () => {
  // So sánh hệ thống xếp phòng:
  //  ++++ Hệ thống xếp phòng GAME:
  //            1/ User đăng ký xếp phòng
  //            2/ Đủ số lượng user đăng ký, thông báo "Xác nhận vào phòng"
  //            2/ Nếu user "Xác nhận vào phòng", không thể huỷ
  //  ++++ Hệ thống xếp phòng AWAKEN:
  //            1/ User đăng ký xếp phòng
  //            2/ Nếu phải thông báo "Xác nhận vào phòng" sau mỗi lượt => không còn auto
  //            => Bỏ bước "Xác nhận vào phòng", 1 khi đã đăng ký xếp phòng Awaken, không thể huỷ!

  // #TODO:
  //        1/ Viết lại awaken:
  //        2/ Viết lại awaken:

  const socket = useContext(SocketContext);

  const handleRegister = () => {
    socket.emit('AWAKEN_REGISTER', PATTERNS_AMOUNT);
  };

  const handleUnregister = () => {
    socket.emit('AWAKEN_UNREGISTER');
  };

  return (
    <>
      <Button colorScheme="primary" onClick={handleRegister}>
        Awaken Register
      </Button>
      <Button colorScheme="secondary" onClick={handleUnregister}>
        Awaken Unregister
      </Button>
    </>
  );
};

export default TestingButton;
