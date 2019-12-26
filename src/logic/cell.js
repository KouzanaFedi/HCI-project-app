class Cell {
    constructor() {
        this.value = 0;
        this.hidden = true;
        this.isMine = false;
    }

    show() {
        if (this.hidden == true) {
            this.hidden = false;
        }
    }

    armCell() {
        this.value = -1
        this.isMine = true;
        this.hidden = false;
    }

    addAdjacentMinesCount(count) {
        if (!this.isMine) {
            this.value = count;
        }
    }

}
export default Cell;