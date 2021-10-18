class TimestampList {
  constructor(list) {
    this.list = list;
  }

  addToList(timestamp) {
    if (this.list.length >= 10) {
      this.list.shift();
    }
    this.list.push(timestamp);
    this.last = this.list[this.list.length - 1];
    this.nextToLast = this.list[this.list.length - 2];
  }

  checkNewSession() {
    if (this.nextToLast) {
      return this.last.order > this.nextToLast.order && this.last.isBetSession;
    }
    return false;
  }
}

export default TimestampList;
