import { chromium } from 'playwright';

import Engine from '../../class/Engine';

export default async (localStorage) => {
  const pwEngine = new Engine(chromium, `https://${process.env.DOMAIN}`);
  await pwEngine.init();
  await pwEngine.setLocalStorage(localStorage);
  await pwEngine.toTradePage();
};
