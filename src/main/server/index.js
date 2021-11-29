/* eslint-disable no-console */
import express from 'express';

import Engine from './class/Engine';
import getTimestamp from './controllers/timestamp/getTimestamp';
import reloadTimestamp from './controllers/timestamp/reloadTimestamp';

const app = express();
app.use(express.json());
// app.use(cors());

const port = process.env.LOCAL_PORT;

let page;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/auth/check-logged-in-before', async (req, res) => {
  const localStorage = await `isEmailExisted`(req.body.email);
  if (localStorage) {
    res.send({ isLoggedInBefore: true, localStorage });
  } else {
    res.send({ isLoggedInBefore: false, localStorage });
  }
});

app.post('/auth/check-logged-in-success', async (req, res) => {
  const loginEngine = new Engine();
  const response = await loginEngine.loginWithAccessToken(req.body);

  if (response.isLoggedInSuccess) {
    res.send(response.isLoggedInSuccess);
    page = response.engine;
  } else {
    res.send(response.isLoggedInSuccess);
  }
});

app.get('/auth/change-account-type/:type', async (req, res) => {
  try {
    await page.evaluate((type) => {
      window.localStorage.setItem('BO_BALANCE_TYPE', type);
    }, req.params.type);

    res.send({ success: true });
  } catch (err) {
    res.send({ success: false });
  }
});

app.post('/auth/login', async (req, res) => {
  const loginEngine = new Engine();
  const response = await loginEngine.loginWithBrowser(req.body);
  res.send(response);
});

app.get('/dashboard/timestamp', async (req, res) => {
  const timestamp = await getTimestamp(page);
  res.send(timestamp);
});

app.get('/dashboard/reload', async (req, res) => {
  await reloadTimestamp(page);
  res.send(true);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
