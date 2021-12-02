/* eslint-disable no-console */
const { chromium, firefox } = require('playwright');
const process = require('process');
const os = require('os');

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const isVisual = true;

class Engine {
  constructor(engine, url) {
    this.engine = engine;
    this.url = url;
  }

  setEngineDir(browser) {
    if (process.env.OS === 'mac') {
      this.engineDirectory = `${os.homedir()}/LenThienDang${
        browser === 'firefox'
          ? '/Nightly.app/Contents/MacOS/firefox'
          : '/Chromium.app/Contents/MacOS/Chromium'
      }`;
    } else {
      this.engineDirectory = `${process.cwd()}/browsers/${browser}-win/${browser}.exe`;
    }
  }

  async init() {
    if (isVisual) {
      try {
        this.browser = await this.engine.launch({
          headless: false,
          executablePath:
            process.env.NODE_ENV === 'development' ? '' : this.engineDirectory,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      this.browser = await this.engine.launch();
    }

    const context = await this.browser.newContext({
      locale: 'vi-VN',
      userAgent:
        process.env.OS === 'mac'
          ? 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4392.0 Safari/537.36'
          : '',
    });
    this.page = await context.newPage();
    await this.page.goto(this.url);
  }

  async setLocalStorage(localStorage) {
    await this.page.evaluate((storage) => {
      window.localStorage.setItem('USER_TOKEN', storage.USER_TOKEN);
    }, localStorage);
  }

  async fillLoginInput(user) {
    await this.page.fill('input[name="email"]', user.email);
  }

  async waitUntilLoginSuccess() {
    await this.page.waitForSelector('#binaryPage', { timeout: 0 });
  }

  async getToken() {
    let token = await this.page.evaluate(() =>
      JSON.parse(window.localStorage.getItem('USER_TOKEN'))
    );
    if (!token) {
      await sleep(3000);
      token = await this.page.evaluate(() =>
        JSON.parse(window.localStorage.getItem('USER_TOKEN'))
      );
    }
    if (!token) {
      await sleep(3000);
      token = await this.page.evaluate(() =>
        JSON.parse(window.localStorage.getItem('USER_TOKEN'))
      );
    }

    return token;
  }

  closePage() {
    this.page.close();
    this.browser.close();
  }

  async goToPage(engine, url) {
    this.engine = engine;
    this.url = url;
    await this.init();
  }

  async loginWithBrowser(user) {
    try {
      this.setEngineDir('firefox');

      await this.goToPage(firefox, `https://${process.env.DOMAIN}/login`);
      await this.page.waitForSelector(exchange.emailInput, { timeout: 0 });
      await this.fillLoginInput(user);
      await this.waitUntilLoginSuccess();

      const token = await this.getToken();
      this.closePage();
      return {
        status: true,
        local: {
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
        },
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async loginWithAccessToken(data) {
    try {
      this.setEngineDir('chrome');
      await this.goToPage(
        chromium,
        `https://${process.env.DOMAIN}`,
        data.localStorage
      );
      await this.setLocalStorage(data.localStorage);
      await this.page.goto(`https://${process.env.DOMAIN}/index`);
      if (!this.page.url().includes('/index')) {
        await this.closePage();
        return { isLoggedInSuccess: false };
      }
      return { isLoggedInSuccess: true, engine: this.page };
    } catch (err) {
      return { isLoggedInSuccess: false };
    }
  }
}

module.exports = Engine;
