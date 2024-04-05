const getRows = (board, size)=> {
    const rows = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push(board[i * size + j]);
        }
        rows.push(row);
    }
    return rows;
}

const getColumns = (board, size)=> {
    const columns = [];
    for (let i = 0; i < size; i++) {
        const column = [];
        for (let j = 0; j < size; j++) {
            column.push(board[j * size + i]);
        }
        columns.push(column);
    }
    return columns;
}

const getDiagonals = (board, size)=> {
    const diagonals = [];
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < size; i++) {
        diagonal1.push(board[i * size + i]);
        diagonal2.push(board[i * size + (size - 1 - i)]);
    }
    diagonals.push(diagonal1, diagonal2);
    return diagonals;
}


const checkWinner = (board, size)=>{
    const rows = getRows(board, size);
    const columns = getColumns(board, size);
    const diagonals = getDiagonals(board, size);


    const allLines = rows.concat(columns).concat(diagonals);
    for (let line of allLines) {
        const lineSet = new Set(line);
        if (lineSet.size === 1 && lineSet.has(1)) {
            return 'X';
        } else if (lineSet.size === 1 && lineSet.has(0)) {
            return 'O';
        }
    }

    return null;        // If no winner is found

}








export default checkWinner;