import AwakenPatternList from './AwakenPatternList';

class AwakeningInstance {
  static getInstance() {
    if (!this.instance) {
      this.instance = new AwakenPatternList();
    }
    return this.instance;
  }
}

export default AwakeningInstance;
