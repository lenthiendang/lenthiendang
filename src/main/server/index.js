/* eslint-disable no-console */

const Engine = require('./class/Engine');
// const getTimestamp = require('./controllers/timestamp/getTimestamp');
// const reloadTimestamp = require('./controllers/timestamp/reloadTimestamp');

const port = process.env.LOCAL_PORT;

let page;

const server = {
  async checkLoggedinSuccess() {
    const loginEngine = new Engine();
    const response = await loginEngine.loginWithAccessToken(req.body);

    if (response.isLoggedInSuccess) {
      return response.isLoggedInSuccess;
      page = response.engine;
    } else {
      return response.isLoggedInSuccess;
    }
  },

  async changeAccountType() {
    try {
      await page.evaluate((type) => {
        window.localStorage.setItem('BO_BALANCE_TYPE', type);
      }, req.params.type);

      return { success: true };
    } catch (err) {
      return { success: false };
    }
  },

  async login() {
    const loginEngine = new Engine();
    const response = await loginEngine.loginWithBrowser(req.body);
    return response;
  },
};

// app.post('/auth/check-logged-in-success', async (req, res) => {});

// app.get('/auth/change-account-type/:type', async (req, res) => {});

// app.post('/auth/login', async (req, res) => {});
