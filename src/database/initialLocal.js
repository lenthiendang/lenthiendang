import { PATTERN_TYPE } from '../renderer/domains/Awakening/awakeningUtil';

export default {
  awakenPatterns: [
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
        { betType: false, betAmount: 54.98 },
      ],
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
        { betType: true, betAmount: 54.98 },
      ],
    },
    {
      id: 3,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 1,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 2 },
        { betType: true, betAmount: 5 },
      ],
    },
    {
      id: 4,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 2,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 2 },
        { betType: true, betAmount: 5 },
      ],
    },
    {
      id: 5,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 3,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 2 },
        { betType: true, betAmount: 5 },
      ],
    },
    {
      id: 6,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 4,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 2 },
        { betType: true, betAmount: 5 },
      ],
    },
    {
      id: 7,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 5,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 2 },
        { betType: true, betAmount: 5 },
      ],
    },
    {
      id: 8,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 1,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 2 },
        { betType: true, betAmount: 5 },
        { betType: true, betAmount: 13 },
      ],
    },
    {
      id: 9,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 2,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 2 },
        { betType: true, betAmount: 5 },
        { betType: true, betAmount: 13 },
      ],
    },
    {
      id: 10,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 3,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 2 },
        { betType: true, betAmount: 5 },
        { betType: true, betAmount: 13 },
      ],
    },
    {
      id: 11,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 4,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 2 },
        { betType: true, betAmount: 5 },
        { betType: true, betAmount: 13 },
      ],
    },
    {
      id: 12,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 5,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 2 },
        { betType: true, betAmount: 5 },
        { betType: true, betAmount: 13 },
      ],
    },
    {
      id: 13,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 1,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
      ],
    },
    {
      id: 14,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 2,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
      ],
    },
    {
      id: 15,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 3,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
      ],
    },
    {
      id: 16,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 4,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
      ],
    },
    {
      id: 17,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 5,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
      ],
    },
    {
      id: 18,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 1,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
        { betType: true, betAmount: 29 },
      ],
    },
    {
      id: 19,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 2,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
        { betType: true, betAmount: 29 },
      ],
    },
    {
      id: 20,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 3,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
        { betType: true, betAmount: 29 },
      ],
    },
    {
      id: 21,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 4,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
        { betType: true, betAmount: 29 },
      ],
    },
    {
      id: 22,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 5,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
        { betType: true, betAmount: 29 },
      ],
    },
    {
      id: 23,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 1,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
        { betType: true, betAmount: 29 },
        { betType: true, betAmount: 88 },
      ],
    },
    {
      id: 24,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 2,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
        { betType: true, betAmount: 88 },
      ],
    },
    {
      id: 25,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 3,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
        { betType: true, betAmount: 29 },
        { betType: true, betAmount: 88 },
      ],
    },
    {
      id: 26,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 4,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
        { betType: true, betAmount: 29 },
        { betType: true, betAmount: 88 },
      ],
    },
    {
      id: 27,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 5,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1 },
        { betType: true, betAmount: 3 },
        { betType: true, betAmount: 9 },
        { betType: true, betAmount: 29 },
        { betType: true, betAmount: 88 },
      ],
    },
    {
      id: 28,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 1,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1.5 },
        { betType: true, betAmount: 3.5 },
        { betType: true, betAmount: 10.5 },
        { betType: true, betAmount: 33 },
        { betType: true, betAmount: 99 },
      ],
    },
    {
      id: 29,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 2,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1.5 },
        { betType: true, betAmount: 3.5 },
        { betType: true, betAmount: 10.5 },
        { betType: true, betAmount: 33 },
        { betType: true, betAmount: 99 },
      ],
    },
    {
      id: 30,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 3,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1.5 },
        { betType: true, betAmount: 3.5 },
        { betType: true, betAmount: 10.5 },
        { betType: true, betAmount: 33 },
        { betType: true, betAmount: 99 },
      ],
    },
    {
      id: 31,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 4,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1.5 },
        { betType: true, betAmount: 3.5 },
        { betType: true, betAmount: 10.5 },
        { betType: true, betAmount: 33 },
        { betType: true, betAmount: 99 },
      ],
    },
    {
      id: 32,
      type: PATTERN_TYPE.MARTINGALE,
      condition: 'T',
      maxWinCount: 5,
      betLoop: [1],
      betOrders: [
        { betType: true, betAmount: 1.5 },
        { betType: true, betAmount: 3.5 },
        { betType: true, betAmount: 10.5 },
        { betType: true, betAmount: 33 },
        { betType: true, betAmount: 99 },
      ],
    },
  ],
};
