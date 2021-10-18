import { firefox } from 'playwright';

const login = async (page, user) => {
  await page.goto(
    `https://${
      process.env.EXCHANGE === 'remitex.net' ? 'didi.biz' : process.env.EXCHANGE
    }/index`
  );
  await page.type('[name="email"]', user.email); // Types email
  await page.type('[name="password"]', user.password); // Types slower, like a user
  await page.click('.siginButton');
  await page.waitForSelector('.bet-wrapper', { state: 'attached' });
};

const getAccessToken = async (user) => {
  const browser = await firefox.launch({ headless: false });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    locale: 'vi-VN',
  });
  const page = await context.newPage();
  await login(page, user);
  const localStorage = await page.evaluate(() =>
    JSON.stringify(window.localStorage)
  );
  await browser.close();
  return localStorage;
};
export default getAccessToken;
