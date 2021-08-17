import dayjs from 'dayjs';

class Timestamp {
  constructor(delayedTime) {
    this.timestamp = dayjs();
    this.counter = 0;
    this.isBetSession = false;
    // call immediately after initing
    this.count();
  }

  toggleBetSession() {
    // prevent delayed time
    // depend on exchange server
    this.isBetSession = this.counter >= 30 && this.counter <= 60;
  }

  count() {
    // set 'counter' by 'timestamp' (60s frame)
    // using .ceil instead of .floor
    this.counter += Math.ceil((60000 - (this.timestamp % 60000)) / 1000);
    // toggle 'isBetSession' by 'counter'
    this.toggleBetSession();
    // format 'counter' in 30s frame
    if (!(this.counter <= 30 && this.counter > 0)) {
      this.counter -= 30;
    }
  }
}

export default Timestamp;
