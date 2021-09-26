import dayjs from 'dayjs';

class Timestamp {
  constructor() {
    this.timestamp = dayjs();
    this.counter = 0;
    this.isBetSession = false;
    // call immediately after initing
    this.count();
  }

  toggleBetSession() {
    // prevent delayed time
    // depend on exchange server
    this.isBetSession = this.counter > 5 && this.counter <= 10;
  }

  count() {
    // set 'counter' by 'timestamp' (60s frame)
    // using .ceil instead of .floor
    this.counter += Math.ceil((10000 - (this.timestamp % 10000)) / 1000);
    // toggle 'isBetSession' by 'counter'
    this.toggleBetSession();
    // format 'counter' in 5s frame
    if (!(this.counter <= 5)) {
      this.counter -= 5;
    }
  }
}

export default Timestamp;
