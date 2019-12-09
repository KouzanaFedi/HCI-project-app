class Minesweeper {
    constructor(nbRows, nbColumns, nbMines) {
        this.nbColumns = nbColumns;
        this.nbRows = nbRows;
        this.nbMines = nbMines;

        let grid = new Array(this.nbRows);
        for (let index = 0; index < this.nbRows; index++) {
            grid[index] = new Array(this.nbColumns).fill(0);

        }

        this.grid = grid;
        this.minesPos = new Array(this.nbMines);

        for (let index = 0; index < this.nbMines; index++) {
            let {
                rowIndex,
                columnIndex
            } = this.AddMinePos(this.minesPos, this.nbRows, this.nbColumns)
            this.grid[rowIndex][columnIndex] = -1;
        }

        for (let i = 0; i < this.nbRows; i++) {
            for (let j = 0; j < this.nbColumns; j++) {
                if (this.isNotMine(this.grid[i][j])) {
                    this.grid[i][j] += this.adjacentMinesCount(i, j);
                }
            }
        }


        console.log(this.grid);
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

    isNotMine(index) {
        return index != -1;
    }

    getAllNeighbours(rowIndex, columnIndex) {
        let neighbours = [];
        if (rowIndex - 1 > 0) {
            neighbours.push({
                "rowIndex": rowIndex - 1,
                columnIndex
            });
        }
        if (rowIndex - 1 > 0 && columnIndex - 1 > 0) {
            neighbours.push({
                "rowIndex": rowIndex - 1,
                "columnIndex": columnIndex - 1
            });
        }
        if (rowIndex - 1 > 0 && columnIndex + 1 < this.nbColumns) {
            neighbours.push({
                "rowIndex": rowIndex - 1,
                "columnIndex": columnIndex + 1

            });
        }
        if (columnIndex - 1 > 0) {
            neighbours.push({
                rowIndex,
                "columnIndex": columnIndex - 1
            });
        }
        if (columnIndex + 1 < this.nbColumns) {
            neighbours.push({
                rowIndex,
                "columnIndex": columnIndex + 1
            });
        }
        if (rowIndex + 1 < this.nbRows) {
            neighbours.push({
                "rowIndex": rowIndex + 1,
                columnIndex
            });
        }
        if (rowIndex + 1 < this.nbRows && columnIndex - 1 > this.nbColumns) {
            neighbours.push({
                "rowIndex": rowIndex + 1,
                "columnIndex": columnIndex - 1
            });
        }
        if (rowIndex + 1 < this.nbRows && columnIndex + 1 < this.nbColumns) {
            neighbours.push({
                "rowIndex": rowIndex + 1,
                "columnIndex": columnIndex + 1

            });
        }

        return neighbours;
    }


    adjacentMinesCount(rowIndex, columnIndex) {
        let count = 0;
        this.getAllNeighbours(rowIndex, columnIndex).forEach(element => {
            let {
                rowIndex,
                columnIndex
            } = element;
            if (!this.isNotMine(this.grid[rowIndex][columnIndex])) {
                count++;
            }
        });
        return count;
    }
}

export default Minesweeper;