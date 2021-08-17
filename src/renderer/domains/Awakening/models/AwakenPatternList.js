import AwakenPattern from './AwakenPattern';
import { PATTERN_TYPE } from '../awakeningUtil';

const defaultPatterns = [
  // {
  //   condition: 'G',
  //   betOrders: [
  //     { betType: false, betAmount: 1 },
  //     { betType: false, betAmount: 1.95 },
  //   ],
  // },
  // {
  //   condition: 'G',
  //   betOrders: [
  //     { betType: true, betAmount: 1 },
  //     { betType: true, betAmount: 1.95 },
  //   ],
  // },
  // {
  //   condition: 'G',
  //   betOrders: [
  //     { betType: true, betAmount: 1 },
  //     { betType: false, betAmount: 1.95 },
  //   ],
  // },
  // {
  //   condition: 'G',
  //   betOrders: [
  //     { betType: false, betAmount: 1 },
  //     { betType: true, betAmount: 1.95 },
  //   ],
  // },
  // {
  //   condition: 'T',
  //   betOrders: [
  //     { betType: false, betAmount: 1 },
  //     { betType: false, betAmount: 1.95 },
  //   ],
  // },
  // {
  //   condition: 'T',
  //   betOrders: [
  //     { betType: true, betAmount: 1 },
  //     { betType: true, betAmount: 1.95 },
  //   ],
  // },
  // {
  //   condition: 'T',
  //   betOrders: [
  //     { betType: true, betAmount: 1 },
  //     { betType: false, betAmount: 1.95 },
  //   ],
  // },
  // {
  //   condition: 'T',
  //   betOrders: [
  //     { betType: false, betAmount: 1 },
  //     { betType: true, betAmount: 1.95 },
  //   ],
  // },
  // {
  //   condition: 'G',
  //   betOrders: [
  //     { betType: false, betAmount: 1 },
  //     { betType: false, betAmount: 1.95 },
  //     { betType: false, betAmount: 3.8 },
  //     { betType: false, betAmount: 7.41 },
  //     { betType: false, betAmount: 14.46 },
  //     { betType: false, betAmount: 28.2 },
  //   ],
  // },
  // {
  //   condition: 'T',
  //   betOrders: [
  //     { betType: true, betAmount: 1 },
  //     { betType: true, betAmount: 1.95 },
  //     { betType: true, betAmount: 3.8 },
  //     { betType: true, betAmount: 7.41 },
  //     { betType: true, betAmount: 14.46 },
  //     { betType: true, betAmount: 28.2 },
  //   ],
  // },
  {
    id: 1,
    type: PATTERN_TYPE.PAROLI,
    condition: 'G',
    betLoop: [10],
    betOrders: [
      { betType: false, betAmount: 1 },
      { betType: false, betAmount: 1.95 },
      { betType: false, betAmount: 3.8 },
      { betType: false, betAmount: 7.41 },
      { betType: false, betAmount: 14.46 },
      { betType: false, betAmount: 28.2 },
      { betType: false, betAmount: 54.98 }
    ]
  },
  {
    id: 2,
    type: PATTERN_TYPE.PAROLI,
    condition: 'T',
    betLoop: [10],
    betOrders: [
      { betType: true, betAmount: 1 },
      { betType: true, betAmount: 1.95 },
      { betType: true, betAmount: 3.8 },
      { betType: true, betAmount: 7.41 },
      { betType: true, betAmount: 14.46 },
      { betType: true, betAmount: 28.2 },
      { betType: true, betAmount: 54.98 }
    ]
  }
  // {
  //   type: PATTERN_TYPE.MARTINGALE,
  //   condition: 'TG',
  //   betOrders: [
  //     { betType: true, betAmount: 1 },
  //     { betType: true, betAmount: 1.95 },
  //     { betType: true, betAmount: 3.8 },
  //     { betType: true, betAmount: 7.41 },
  //     { betType: true, betAmount: 14.46 },
  //     { betType: true, betAmount: 28.2 },
  //     { betType: true, betAmount: 54.98 },
  //     { betType: true, betAmount: 107.21 },
  //   ],
  // },
  // {
  //   condition: 'G',
  //   betOrders: [
  //     { betType: false, betAmount: 1 },
  //     { betType: false, betAmount: 1.95 },
  //     { betType: false, betAmount: 3.8 },
  //     { betType: false, betAmount: 7.41 },
  //     { betType: false, betAmount: 14.46 },
  //     { betType: false, betAmount: 28.2 },
  //     { betType: false, betAmount: 54.98 },
  //     { betType: false, betAmount: 107.21 },
  //   ],
  // },
  // {
  //   condition: 'T',
  //   betOrders: [
  //     { betType: true, betAmount: 1 },
  //     { betType: true, betAmount: 1.95 },
  //     { betType: true, betAmount: 3.8 },
  //     { betType: true, betAmount: 7.41 },
  //     { betType: true, betAmount: 14.46 },
  //     { betType: true, betAmount: 28.2 },
  //     { betType: true, betAmount: 54.98 },
  //     { betType: true, betAmount: 107.21 },
  //   ],
  // },
];

class AwakenPatternList {
  constructor() {
    this.maxId = 2;
    this.list = defaultPatterns.map((pattern) => {
      return new AwakenPattern(pattern);
    });
  }

  getIncrementMaxId() {
    return ++this.maxId;
  }

  start(candles) {
    this.list = this.list.map((pattern) => pattern.start(candles));
    return this;
  }

  checkResult(candles) {
    this.list = this.list.map((pattern) => pattern.checkResult(candles));
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

  getPatterns(id) {
    return this.list.find(pattern => id === pattern.id);
  }

  addPattern(pattern) {
    this.list.push(pattern);
  }

  deletePattern(index) {
    this.list.splice(index, 1);
  }

  updatePattern(pattern) {
    const { id } = pattern;
    const index = this.list.findIndex(pattern => id === pattern.id);
    this.list.splice(index, 1, pattern);
  }
}

export default AwakenPatternList;
