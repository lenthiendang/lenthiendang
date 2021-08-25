import AwakenPattern from './AwakenPattern';
import { defaultPatterns } from './defaultData';

class AwakenPatternList {
  constructor() {
    this.maxId = Math.max(...defaultPatterns.map((pattern) => pattern.id));
    this.list = defaultPatterns.map((pattern) => {
      return new AwakenPattern(pattern).getObject();
    });
  }
}

export default AwakenPatternList;
