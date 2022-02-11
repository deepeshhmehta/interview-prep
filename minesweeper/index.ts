function getMineSweeperGrid(rows: number, cols: number, numberOFMines: number) {
    // initialize grid
    const grid: number[][] = [];

    const totalSquares = rows * cols;
    const minesMoreThanHalfEmptySquares = numberOFMines > totalSquares/2;
    // initialize each row
    const row: number[] = [];
    for(let i = 0; i < cols; i++) {
        // if mines are more than empty squares start by inserting a mine everywhere and then we will randomly mark safe squares
        if (!minesMoreThanHalfEmptySquares)
            row.push(0);
        else 
            row.push(9);
    }

    for(let i = 0; i < rows; i++) {
        grid.push(Array<number>(...row));
    }

    let toBePlacedCount = minesMoreThanHalfEmptySquares ? (totalSquares - numberOFMines) : numberOFMines;
    let toPlace = minesMoreThanHalfEmptySquares ? 0: 9;

    while (toBePlacedCount > 0) {
        let randomRow = Math.round(Math.random() * 10) % rows;
        let randomCol = Math.round(Math.random() * 10) % cols;
        
        grid[randomRow][randomCol] = toPlace;
        toBePlacedCount--;
    }

    // traverse through the grid to set cells to correct numbers
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            console.log('\n---');
            console.log({r, c, currentCell: grid[r][c]});
            if (grid[r][c] === 9) {
                continue;
            } else {
                // check all neighbours, if mine add 1 to current

                // left
                if (c - 1 >= 0) {
                    if (grid[r][c-1] === 9) {
                        console.log('left is a mine');
                        grid[r][c]++;
                    }
                }

                // right
                if ((c + 1) < cols) {
                    if (grid[r][c+1] === 9) {
                        console.log('right is a mine');
                        grid[r][c]++;
                    }
                }

                // top
                if (r - 1 >= 0) {
                    if (grid[r-1][c] === 9) {
                        console.log('top is a mine');
                        grid[r][c]++;
                    }
                }

                // top - left
                if ((r - 1 >= 0) && (c-1 >= 0)) {
                    if (grid[r-1][c-1] === 9) {
                        console.log('top - left is a mine');
                        grid[r][c]++;
                    }
                }

                // top - right
                if ((r - 1 >= 0) && ((c + 1) < cols)) {
                    if (grid[r-1][c+1] === 9) {
                        console.log('top - right is a mine');
                        grid[r][c]++;
                    }
                }

                // bottom
                if (r + 1 < cols) {
                    if (grid[r+1][c] === 9) {
                        console.log('bottom is a mine');
                        grid[r][c]++;
                    }
                }

                // bottom - left
                if ((r + 1 < cols) && (c-1 >= 0)) {
                    if (grid[r+1][c-1] === 9) {
                        console.log('bottom - left is a mine');
                        grid[r][c]++;
                    }
                }

                // bottom - right
                if ((r + 1 < cols) && ((c + 1) < cols)) {
                    if (grid[r+1][c+1] === 9) {
                        console.log('bottom - right is a mine');
                        grid[r][c]++;
                    }
                }
                console.log({r, c, currentCell: grid[r][c]});
            };
        }
    }

    return grid;
}


console.log(getMineSweeperGrid(5,5,30));