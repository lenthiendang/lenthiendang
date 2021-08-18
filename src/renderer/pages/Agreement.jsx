import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Center, Text, Flex, ListItem, OrderedList } from '@chakra-ui/react';

import Box from '../components/Box';
import { Button } from '../components/Button';
import useAfterStarting from '../hooks/useAfterStarting';
import scrollBar from '../styles/scrollBar';

const agreements = [
  'Quý khách thừa nhận rằng AILenThienDang là bên thứ 3 độc lập và được sử dụng như một phần mềm nội bộ, AILenThienDang chỉ cung cấp công cụ phân tích, thống kê và các giải pháp tự động để thực hiện các giao dịch trên các sàn giao dịch quyền chọn.',
  'Quý khách nhận thức rằng AILenThienDang cung cấp 100% các tính năng miễn phí với tài khoản DEMO, AILenThienDang khuyên quý khách trải nghiệm các chiến lược giao dịch của mình bằng tài khoản DEMO một thời gian đủ lâu trước khi thực hiện các quyết định đầu tư chính thức nào. Quý khách tự mình đưa ra quyết định về chiến lược giao dịch và các hành động cụ thể dựa trên sự hiểu biết của mình về thị trường hoặc tham vấn với các cố vấn tài chính độc lập.',
  'Quý khách thừa nhận rằng các hoạt động giao dịch của mình có thể gặp rủi ro liên quan đến mạng, bao gồm cả lỗi phần cứng, phần mềm, máy chủ, đường truyền thông tin và internet. Bất kỳ lỗi nào như vậy đều có thể dẫn đến việc không thực hiện giao dịch của Khách hàng theo lệnh đặt của họ. AILenThienDang sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại hoặc mất mát nào do các sự kiện nằm ngoài tầm kiểm soát của mình do sự chậm trễ khách quan từ hỏng hóc phần mềm và phần cứng, ngắt kết nối internet, lỗi thiết bị và chất lượng kém của dịch vụ viễn thông từ phía Khách hàng, thiết bị của Khách hàng bị trục trặc, mất điện.',
  'Quý khách thừa nhận rằng việc đóng cửa sổ AILenThienDang, huỷ lệnh đặt sau khi đã đặt sẽ không hủy đơn đặt hàng hoặc yêu cầu đã được Sàn giao dịch nhận để xử lý.',
  'Quý khách thừa nhận rằng nguồn thông tin duy nhất về giá tài sản là Máy chủ của các Sàn giao dịch. Tất cả các thông tin từ AILenThienDang đều được truy xuất một chiều. Giá tài sản trên thiết bị đầu cuối giao dịch của Khách hàng có thể thay đổi nếu kết nối giữa thiết bị đầu cuối giao dịch của Khách hàng và Máy chủ của Sàn giao dịch trở nên không ổn định, do các nguyên nhân khách quan từ đường truyền của quý khách, một số báo giá tài sản có thể không đến được thiết bị đầu cuối giao dịch của Khách hàng.',
  'Quý khách chịu rủi ro tài chính và các rủi ro khác trong trường hợp các giao dịch (và các hành động liên quan) trên thị trường tài chính bị cấm hoặc hạn chế bởi luật pháp của quốc gia nơi Khách hàng thường trú.',
  'Nếu quý khách đồng ý với tất cả điều khoản sử dụng trên, vui lòng nhấp chuột phải vào phím chọn "Tôi Đồng ý".',
];

const AgreementList = () => {
  return (
    <Flex
      h="58vh"
      fontSize="sm"
      overflowY="scroll"
      flexDir="column"
      css={scrollBar}
      px="2"
      mb="4"
    >
      <OrderedList>
        {agreements.map((agreement, id) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={id}>
            <Text fontWeight="bold" as="span">
              {id + 1}.{' '}
            </Text>
            {agreement}
          </ListItem>
        ))}
      </OrderedList>
    </Flex>
  );
};

const Agreement = () => {
  const [showWarning, toggleWarning] = useState(false);
  const history = useHistory();

  useAfterStarting();

  const handleRightClick = () => {
    history.push('/login');
  };

  const handleClick = () => {
    toggleWarning(true);
  };

  return (
    <Center h="100vh" w="100vw">
      <Box px="20" py="6" w="80vw">
        <Text fontSize="2xl" pb="4">
          Điều khoản sử dụng & Miễn trừ trách nhiệm
        </Text>
        <AgreementList />
        {showWarning ? (
          <Text fontSize="sm" color="red.400">
            Vui lòng đọc kỹ điều khoản
          </Text>
        ) : (
          ''
        )}
        <Button
          onContextMenu={handleRightClick}
          onClick={handleClick}
          w="sm"
          alignSelf="center"
        >
          Tôi Đồng ý
        </Button>
      </Box>
    </Center>
  );
};

export default Agreement;
