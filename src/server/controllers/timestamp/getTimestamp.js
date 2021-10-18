export default async (page) => {
  try {
    if (page) {
      // console.log('x');
      const timestamp = await page.evaluate(
        () => localStorage.CAN && JSON.parse(localStorage.CAN)
      );
      // console.log(timestamp.order);
      return timestamp;
    }
    return 'Lỗi kết nối';
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
};
