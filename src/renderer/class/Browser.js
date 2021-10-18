import axios from 'axios';

class Browser {
  constructor() {
    this.hostname = `http://localhost:${process.env.LOCAL_PORT}`;
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  async loginWithEmailAndPassword(account) {
    const res = await axios.post(
      `${this.hostname}/auth/login`,
      account,
      this.config
    );
    return res;
  }

  async loginOnBrowserWithToken(email, refreshToken) {
    const localStorage = {
      lang: '{"value":400,"name":"Tiếng Việt","icon":"/public/images/flags/vi.png","code":"vi"}',
      USER_TOKEN: `{"refresh_token":"${refreshToken}","country":{"code":"VN","name":"Vietnam"}}`,
    };

    await axios.post(
      `${this.hostname}/auth/check-logged-in-success`,
      { localStorage, email },
      this.config
    );
  }
}

export default Browser;
