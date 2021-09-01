import { PATTERN_TYPE } from '../awakeningUtil';

const initBetRatio = (ratios, betLoop) => {
  const betRatio = [];
  if (Array.isArray(betLoop) && betLoop.length === ratios.length) {
    betLoop.forEach((length, i) => {
      betRatio.push(...new Array(length).fill(ratios[i]));
    });
  } else {
    const length = Array.isArray(betLoop) ? betLoop[0] : Number(betLoop);
    ratios.forEach((ratio) => {
      betRatio.push(...new Array(length).fill(ratio));
    });
  }
  return betRatio;
};

class AwakenPattern {
  constructor(pattern) {
    this.id = pattern.id;
    this.type = pattern.type || PATTERN_TYPE.PAROLI;
    this.isActive = pattern.isActive || false;
    this.condition = pattern.condition;
    this.betOrders = pattern.betOrders;
    this.betLoop = pattern.betLoop || [0];
    this.maxWinCount = pattern.maxWinCount;
    this.martingaleWinLoop = pattern.martingaleWinLoop || [20];
    this.martingaleWinLoopPos = pattern.martingaleWinLoopPos || 0;
    this.betRatioInit = pattern.betRatios || [1];
    this.betRatio = initBetRatio(this.betRatioInit, this.betLoop);
    this.betRatioPos = 0;
    this.patternPos = 0;
    this.profit = 0;
    this.recentProfit = 0;
    this.betAmount = 0;
    this.isRunning = false;
    this.winCount = 0;
    this.loseCount = 0;
    this.profitLoop = 0;
    this.virtualProfit = 0;
    this.isVirtualRun = false;
    this.betOrderUpdatedCount = 0;
  }

  getObject() {
    return {
      id: this.id,
      type: this.type,
      isActive: this.isActive,
      condition: this.condition,
      betOrders: this.betOrders,
      betLoop: this.betLoop,
      betRatioInit: this.betRatioInit,
      betRatio: this.betRatio,
      betRatioPos: this.betRatioPos,
      patternPos: this.patternPos,
      profit: this.profit,
      recentProfit: this.recentProfit,
      betAmount: this.betAmount,
      isRunning: this.isRunning,
      winCount: this.winCount,
      loseCount: this.loseCount,
      maxWinCount: this.maxWinCount,
      profitLoop: this.profitLoop,
      virtualProfit: this.virtualProfit,
      martingaleWinLoop: this.martingaleWinLoop,
      martingaleWinLoopPos: this.martingaleWinLoopPos,
      isVirtualRun: this.isVirtualRun,
      betOrderUpdatedCount: this.betOrderUpdatedCount,
    };
  }
}

export default AwakenPattern;
