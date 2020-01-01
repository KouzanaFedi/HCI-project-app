class Cell {
    constructor() {
        this.value = 0;
        this.hidden = true;
        this.isMine = false;
        this.flagged = false;
    }

    show() {
        if (this.hidden) {
            this.hidden = false;
        }
    }

    armCell() {
        this.value = -1
        this.isMine = true
    }

    flag() {
        if (this.hidden) {
            this.flagged = !this.flagged;
        }
    }

    addAdjacentMinesCount(count) {
        if (!this.isMine) {
            this.value = count;
        }
    }

}
export default Cell;