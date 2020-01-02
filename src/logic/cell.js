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
            if (this.flagged)
                return -1;
            else
                return 1;
        }
    }

    addAdjacentMinesCount(count) {
        if (!this.isMine) {
            this.value = count;
        }
    }

}
export default Cell;