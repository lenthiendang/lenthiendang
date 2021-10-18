/* eslint-disable no-console */
import axios from 'axios';

import exchange from '../../constant/exchanges';

class API {
  constructor(exc) {
    this.accessToken = exc.accessToken;
    this.refreshToken = exc.refreshToken;
  }

  setConfig(token) {
    this.config = {
      headers: {
        authorization: `Bearer ${this[token]}`,
      },
    };
  }

  async fetchFromExchangeServer(apiName, data) {
    try {
      const { method, url, token } = exchange.apis[apiName];
      let result;
      this.setConfig(token);
      if (method === 'get') {
        result = await axios[method](url, this.config);
      } else {
        result = await axios[method](url, data, this.config);
      }

      return result.data.d;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default API;
