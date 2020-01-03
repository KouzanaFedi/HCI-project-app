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

    flag(canAdd) {

        if (this.hidden) {
            if (!this.flagged && canAdd) {
                this.flagged = true;
                return -1;
            } else if (this.flagged) {
                this.flagged = false;
                return 1;
            }
        }
    }

    addAdjacentMinesCount(count) {
        if (!this.isMine) {
            this.value = count;
        }
    }

}
export default Cell;