import dayjs from 'dayjs';

// import API from './API';
import { sleep, decodeToken, getExpiredDate } from '../utils';
// import exchange from '../../constant/exchanges';

export const checkTokenExpire = (token) =>
  dayjs(getExpiredDate(token)).diff(new Date()) > 10 * 60 * 1000;

class User {
  constructor(user) {
    this.accessToken = user.accessToken;
    this.refreshToken = user.refreshToken;
    this.role = user.role || 10;
    this.expiredOn = dayjs().add(3, 'd').valueOf();
    this.data = {};
    this.setAPI();
  }

  async init() {
    await this.resetToken();
    // get info
    await this.getBalance();
    await this.getProfile();
    await this.getStatistics();
    await this.getOverview();
  }

  getProperty() {
    return { ...this };
  }

  // setAPI() {
  //   this.api = new API({
  //     accessToken: this.accessToken,
  //     refreshToken: this.refreshToken,
  //   });
  // }

  // async resetToken() {
  //   try {
  //     const data = {
  //       client_id: exchange.client_id,
  //       grant_type: 'refresh_token',
  //       refresh_token: this.refreshToken,
  //     };
  //     const res = await this.api.fetchFromExchangeServer('token', data);
  //     this.accessToken = res.access_token;
  //     this.refreshToken = res.refresh_token;
  //     this.setAPI();
  //     this.setDecodedData();
  //     return true;
  //   } catch (err) {
  //     return false;
  //   }
  // }

  setDecodedData() {
    const decode = decodeToken(this.accessToken);
    this.agent = decode.d_id;
  }

  async autoResetToken() {
    while (checkTokenExpire(this.refreshToken)) {
      await this.resetToken();
      await sleep(3 * 60 * 1000);
    }
  }

  async getBalance() {
    this.data.balance = await this.api.fetchFromExchangeServer('balance');
    this.balances = {};
    this.balances.LIVE = this.data.balance.availableBalance;
    this.balances.DEMO = this.data.balance.demoBalance;
  }

  async getWalletBalance() {
    const balance = await this.api.fetchFromExchangeServer('balance');
    return balance;
  }

  async getProfile() {
    this.data.profile = await this.api.fetchFromExchangeServer('profile');
    this.enabled2fa = this.data.profile['2fa'];
    this.email = this.data.profile.e;
    this.name = this.data.profile.nn;
    this.photo = this.data.profile.photo
      ? `https://${process.env.EXCHANGE}${this.data.profile.photo}`
      : '';
    this.uid = this.data.profile.uid;
    this.joinedDate = dayjs(new Date(this.data.profile.uid)).format(
      'HH:mm DD/MM/YYYY'
    );
  }

  async getStatistics() {
    this.data.statistics = await this.api.fetchFromExchangeServer('statistics');
  }

  async getOverview() {
    this.data.overview = await this.api.fetchFromExchangeServer('overview');
    this.sponsor = this.data.overview.sponsor;
  }
}

export default User;
