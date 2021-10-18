import axios from 'axios';

class Server {
  constructor(user) {
    this.accessToken = user.accessToken;
    this.hostname = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api/v1`;
    this.setConfig();
  }

  setConfig() {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.accessToken}`,
      },
    };
  }

  async checkUser(userData) {
    const url = `${this.hostname}/user/checkuser`;

    userData.version = process.env.VERSION;
    const res = await axios.post(
      url,
      { ...userData, exchange: process.env.EXCHANGE },
      this.config
    );
    return res.data.result;
  }

  async subscribe(transactionData) {
    const url = `${this.hostname}/user/subscribe`;
    const res = await axios.post(
      url,
      { ...transactionData, exchange: process.env.EXCHANGE },
      this.config
    );
    return res.data;
  }
}

export default Server;
