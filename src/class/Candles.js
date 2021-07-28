import dayjs from 'dayjs';

const initRandomCandle = () => {
  const randNum = Math.random();
  return randNum >= 0.5;
};

class Candles {
  constructor(candles) {
    this.list = candles;
  }

  updateCandles() {
    const newCandle = {
      time: dayjs().format('YYYY-MM-DD HH:mm:ss').toString(),
      session: this.list.length ? this.list[this.list.length - 1].session + 1 : 0,
      type: initRandomCandle(),
    };
    this.list = [...this.list, newCandle];
  }
}

export default Candles;
