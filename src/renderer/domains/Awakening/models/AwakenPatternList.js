import AwakenPattern from './AwakenPattern';

class AwakenPatternList {
  constructor(initPatternList) {
    this.maxId = Math.max(...initPatternList.map((pattern) => pattern.id));
    this.list = initPatternList.map((pattern) => {
      return new AwakenPattern(pattern).getObject();
    });
  }
}

export default AwakenPatternList;
