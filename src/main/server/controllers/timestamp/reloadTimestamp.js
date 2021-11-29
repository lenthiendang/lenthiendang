const reload = async (page) => {
  if (page) {
    await page.reload();
    await page.waitForSelector('.bet-wrapper', { timeout: 0 });
  }
  return true;
};

export default reload;
