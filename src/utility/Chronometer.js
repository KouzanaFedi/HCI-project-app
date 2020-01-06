class Chronometer {

    constructor() {
        this.timerState = "stopped";
        this.currentTimer = 0;
        this.formattedTime = "00:00:00";
        this.ticker = undefined;
    }

    start() {
        if (this.timerState !== "running") {
            this.tick();
            this.timerState = "running";
        }
    }
    pause() {
        window.clearInterval(this.ticker);
        this.timerState = "paused";
    }
    reset() {
        window.clearInterval(this.ticker);
        this.currentTimer = 0;
        this.formattedTime = "00:00:00";
        this.timerState = "reseted";
        this.minesweeper.firstClick = true;
    }
    tick() {
        this.ticker = setInterval(() => {
            this.currentTimer++;
            this.formattedTime = this.formatTime(this.currentTimer);
        }, 1000);
    }
    formatTime(seconds) {
        let measuredTime = new Date(null);
        measuredTime.setSeconds(seconds);
        let MHSTime = measuredTime.toISOString().substr(11, 8);
        return MHSTime;
    }
}

export default Chronometer;