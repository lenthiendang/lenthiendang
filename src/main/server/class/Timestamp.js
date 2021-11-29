class Timestamp {
  constructor(timestamp) {
    this.lowPrice = timestamp.lowPrice;
    this.session = timestamp.session;
    this.isBetSession = timestamp.isBetSession;
    this.highPrice = timestamp.highPrice;
    this.openPrice = timestamp.openPrice;
    this.closePrice = timestamp.closePrice;
    this.baseVolume = timestamp.baseVolume;
    this.orderClose = timestamp.orderClose;
    this.createDateTime = timestamp.createDateTime;
    this.ordinal = timestamp.ordinal;
    this.order = timestamp.order;
  }
}

export default Timestamp;
