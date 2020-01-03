import Cell from "./cell"

class Minesweeper {
    constructor(nbRows, nbColumns, nbMines) {
        this.nbColumns = nbColumns;
        this.nbRows = nbRows;
        this.nbMines = nbMines;
        this.mineNotFlagged = this.nbMines;
        this.firstClick = true;

        let grid = new Array(this.nbRows);
        for (let i = 0; i < this.nbRows; i++) {
            grid[i] = new Array(this.nbColumns);
            for (let j = 0; j < this.nbColumns; j++) {
                grid[i][j] = new Cell();
            }

        }

        this.grid = grid;
        this.minesPos = []

        for (let index = 0; index < this.nbMines; index++) {
            let {
                rowIndex,
                columnIndex
            } = this.AddMinePos(this.minesPos, this.nbRows, this.nbColumns)
            let cell = this.grid[rowIndex][columnIndex];
            cell.armCell();
        }

        this.UpdateAdjacentMinesCount();

    }

    UpdateAdjacentMinesCount() {
        for (let i = 0; i < this.nbRows; i++) {
            for (let j = 0; j < this.nbColumns; j++) {
                let cell = this.grid[i][j];
                if (!cell.isMine) {
                    cell.addAdjacentMinesCount(this.adjacentMinesCount(i, j));
                }
            }
        }
    }

    AddMinePos() {
        let rowIndex = Math.floor(Math.random() * this.nbRows);
        let columnIndex = Math.floor(Math.random() * this.nbColumns);

        while (this.minePosExists({
                rowIndex,
                columnIndex
            })) {
            rowIndex = Math.floor(Math.random() * this.nbRows);
            columnIndex = Math.floor(Math.random() * this.nbColumns);
        }

        this.minesPos.push({
            rowIndex,
            columnIndex
        });

        return {
            rowIndex,
            columnIndex
        };
    }

    minePosExists(pos) {
        let exists = false;
        this.minesPos.forEach(element => {
            if (JSON.stringify(element) == JSON.stringify(pos)) {
                exists = true;
            }
        });

        return exists;
    }

    floodFill(rowIndex, columnIndex) {
        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                let i = rowIndex + xoff;
                let j = columnIndex + yoff;

                if (i >= 0 && i < this.nbRows && j >= 0 && j < this.nbColumns) {
                    if (this.grid[i][j].hidden) {
                        this.reveal(i, j);
                    }
                }
            }
        }
    }

    reveal(i, j) {
        if (this.firstClick && this.grid[i][j].value == -1) {
            this.firstClick = false;
            let xoff = 0,
                yoff = 0;
            while (this.grid[xoff][yoff].value == -1) {
                if (yoff == this.nbColumns) {
                    xoff++;
                    yoff = 0;
                } else
                    yoff++;
            }
            this.grid[xoff][yoff].armCell();
            this.grid[i][j].value = 0;
            this.grid[i][j].isMine = false;

            this.UpdateAdjacentMinesCount();
            this.minesPos.splice(this.getMinePos(i, j), 1);
            this.minesPos.push({
                rowIndex: xoff,
                columnIndex: yoff
            });

        }
        this.grid[i][j].show();
        if (this.grid[i][j].value == 0) {
            this.floodFill(i, j);
        }

    }

    getMinePos(x, y) {
        let mine = JSON.stringify({
            rowIndex: x,
            columnIndex: y
        })


        this.minesPos.forEach((element, index) => {
            if (JSON.stringify(element) === mine) {
                console.log(index);

                return index;
            }
        })
    }

    getAllNeighbours(rowIndex, columnIndex) {
        let neighbours = [];

        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
                let i = rowIndex + xoff;
                let j = columnIndex + yoff;

                if (i >= 0 && i < this.nbRows && j >= 0 && j < this.nbColumns) {
                    neighbours.push({
                        "rowIndex": i,
                        "columnIndex": j
                    })
                }
            }
        }
        return neighbours;
    }


    adjacentMinesCount(i, j) {
        let count = 0;
        this.getAllNeighbours(i, j).forEach(element => {
            let {
                rowIndex,
                columnIndex
            } = element;
            if (this.grid[rowIndex][columnIndex].isMine) {
                count++;
            }
        });
        return count;
    }

    updateMinesNotFlaggedCount(n) {
        if (n != null)
            this.mineNotFlagged += n;
    }
}

export default Minesweeper;