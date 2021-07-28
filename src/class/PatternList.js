import AIPattern from './Pattern';
import { formatNumber } from '../utils';

const defaultPatterns = [
  {
    condition: 'G',
    betOrders: [
      { betType: false, betAmount: 1 },
      { betType: false, betAmount: 1.95 },
      { betType: false, betAmount: 3.8 },
      { betType: false, betAmount: 7.41 },
      { betType: false, betAmount: 14.46 },
      { betType: false, betAmount: 28.2 },
    ],
  },
  {
    condition: 'T',
    betOrders: [
      { betType: true, betAmount: 1 },
      { betType: true, betAmount: 1.95 },
      { betType: true, betAmount: 3.8 },
      { betType: true, betAmount: 7.41 },
      { betType: true, betAmount: 14.46 },
      { betType: true, betAmount: 28.2 },
    ],
  },
  {
    condition: 'G',
    betOrders: [
      { betType: false, betAmount: 1 },
      { betType: false, betAmount: 1.95 },
      { betType: false, betAmount: 3.8 },
      { betType: false, betAmount: 7.41 },
      { betType: false, betAmount: 14.46 },
      { betType: false, betAmount: 28.2 },
      { betType: false, betAmount: 54.98 },
    ],
  },
  {
    condition: 'T',
    betOrders: [
      { betType: true, betAmount: 1 },
      { betType: true, betAmount: 1.95 },
      { betType: true, betAmount: 3.8 },
      { betType: true, betAmount: 7.41 },
      { betType: true, betAmount: 14.46 },
      { betType: true, betAmount: 28.2 },
      { betType: true, betAmount: 54.98 },
    ],
  },
  {
    condition: 'G',
    betOrders: [
      { betType: false, betAmount: 1 },
      { betType: false, betAmount: 1.95 },
      { betType: false, betAmount: 3.8 },
      { betType: false, betAmount: 7.41 },
      { betType: false, betAmount: 14.46 },
      { betType: false, betAmount: 28.2 },
      { betType: false, betAmount: 54.98 },
      { betType: false, betAmount: 107.21 },
    ],
  },
  {
    condition: 'T',
    betOrders: [
      { betType: true, betAmount: 1 },
      { betType: true, betAmount: 1.95 },
      { betType: true, betAmount: 3.8 },
      { betType: true, betAmount: 7.41 },
      { betType: true, betAmount: 14.46 },
      { betType: true, betAmount: 28.2 },
      { betType: true, betAmount: 54.98 },
      { betType: true, betAmount: 107.21 },
    ],
  },
];

class AIPatterns {
  constructor() {
    this.list = defaultPatterns.map((pattern) => {
      const pt = new AIPattern(pattern);
      return pt;
    });
  }

  start(candles) {
    this.list = this.list.map((pattern) => pattern.start(candles));
    return this;
  }

  checkResult(lastCandle) {
    this.list = this.list.map((pattern) => pattern.checkResult(lastCandle));
    return this;
  }

  toggleActive(id) {
    this.list = this.list.map((pattern, i) => {
      return i === id ? pattern.toggleActive() : pattern;
    });
  }

  sumProfit() {
    return Math.round(this.list.map((pattern) => pattern.profit).reduce((s, v) => s + v));
  }
}

export default AIPatterns;
