// Timing is Everything

function Clock () {
  this.currentTime;
};

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  var timeString = "" + this.currentTime.getHours() +
            ":" + this.currentTime.getMinutes() +
            ":" + this.currentTime.getSeconds();
  console.log(timeString);
};

Clock.prototype.run = function () {
  // 1. Set the currentTime.
  this.currentTime = new Date();
  // 2. Call printTime.
  this.printTime();
  // 3. Schedule the tick interval.
  setInterval(this._tick.bind(this), Clock.TICK);
};

Clock.prototype._tick = function () {
  // 1. Increment the currentTime.
  this.currentTime.setMilliseconds(this.currentTime.getMilliseconds() + Clock.TICK);
  // 2. Call printTime.
  this.printTime();
};

clock = new Clock();
clock.run();