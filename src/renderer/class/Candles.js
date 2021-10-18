import dayjs from 'dayjs';

const initRandomCandle = (newSession) => {
  const randNum = Math.random();
  return {
    time: dayjs().format('YYYY-MM-DD HH:mm:ss').toString(),
    session: newSession,
    type: randNum >= 0.5,
  };
};

class Candles {
  constructor(candles) {
    this.list = candles;
  }

  updateCandles() {
    const newSession = this.list.length
      ? this.list[this.list.length - 1].session + 1
      : 0;
    const newCandle = initRandomCandle(newSession);
    this.list = [...this.list, newCandle];
  }
}

export default Candles;
