/* eslint-disable no-console */
import axios from 'axios';
import dayjs from 'dayjs';

import API from './API';
import { sleep } from '../../utils';

const convertOHLCsToCandles = (ohlcs) => {
  const candles = [];
  for (let i = 0; i < ohlcs.length; i++) {
    if (
      !(
        (i > 1 && ohlcs[i][9] === ohlcs[i - 1][9]) ||
        ohlcs[i][8] ||
        ohlcs[i][9] % 2 === 1
      )
    ) {
      candles.push({
        time: dayjs(ohlcs[i][0]).format('HH:mm, DD/MM/YYYY').toString(),
        session: ohlcs[i][9],
        type: ohlcs[i][4] - ohlcs[i][1] > 0,
      });
    }
  }

  return candles;
};

class Candle {
  constructor(candles) {
    this.list = candles;
  }

  async initCandles(nbrOfCandles, accessToken) {
    const data = await axios(
      `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api/v1/candle/${nbrOfCandles}`
    );
    const init = data.data.result.map((dt) => ({
      time: dayjs(dt.time)
        .subtract(7, 'h')
        .format('HH:mm, DD/MM/YYYY')
        .toString(),
      session: dt.session,
      type: dt.candle,
    }));
    this.list = init;
    await this.updateLatestCandles(accessToken);
  }

  mergeCandles(newCandles) {
    const firstLastestSession = this.list.findIndex(
      (candle) => candle.session === newCandles[0].session
    );

    this.list = [...this.list.slice(0, firstLastestSession), ...newCandles];
  }

  async updateLatestCandles(accessToken) {
    try {
      const api = new API({ accessToken });
      await sleep(1000);
      const newOHLCs = await api.fetchFromExchangeServer('prices');
      this.mergeCandles(convertOHLCsToCandles(newOHLCs));
      // eslint-disable-next-line prefer-destructuring
      this.lastSession = newOHLCs[newOHLCs.length - 1][9];
    } catch (err) {
      console.log(err);
    }
  }
}

export default Candle;
