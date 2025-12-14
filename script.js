document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('sudoku-grid');
    const newGameBtn = document.getElementById('new-game');
    const resetBtn = document.getElementById('reset');
    const checkBtn = document.getElementById('check');

    let initialPuzzle = [];
    let fullSolution = [];

    // Function to check if a number can be placed at board[row][col]
    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
        }
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    // Backtracking to fill the board
    function fillBoard(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
                    for (let num of nums) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (fillBoard(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    // Generate a full Sudoku board
    function generateFullBoard() {
        const board = Array.from({length: 9}, () => Array(9).fill(0));
        fillBoard(board);
        return board;
    }

    // Create a puzzle by removing some numbers
    function createPuzzle(fullBoard) {
        const puzzle = fullBoard.map(row => [...row]);
        const cellsToRemove = 40; // Remove about 40 cells for medium difficulty
        const positions = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                positions.push([i, j]);
            }
        }
        positions.sort(() => Math.random() - 0.5);
        for (let k = 0; k < cellsToRemove; k++) {
            const [i, j] = positions[k];
            puzzle[i][j] = 0;
        }
        return puzzle;
    }

    // Create the grid
    function createGrid(puzzle) {
        grid.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                if (puzzle[i][j] !== 0) {
                    input.value = puzzle[i][j];
                    input.readOnly = true;
                    input.style.backgroundColor = '#e9ecef';
                }
                input.addEventListener('input', (e) => {
                    const value = e.target.value;
                    if (!/^[1-9]$/.test(value)) {
                        e.target.value = '';
                    }
                });
                cell.appendChild(input);
                row.appendChild(cell);
            }
            grid.appendChild(row);
        }
    }

    // Generate new puzzle
    function generateNewPuzzle() {
        const fullBoard = generateFullBoard();
        fullSolution = fullBoard.map(row => [...row]);
        initialPuzzle = createPuzzle(fullBoard);
        createGrid(initialPuzzle);
    }

    // Reset to initial puzzle
    function resetPuzzle() {
        createGrid(initialPuzzle);
    }

    // Initialize with a puzzle
    generateNewPuzzle();

    newGameBtn.addEventListener('click', generateNewPuzzle);
    resetBtn.addEventListener('click', resetPuzzle);

    // Check solution
    checkBtn.addEventListener('click', () => {
        const inputs = grid.querySelectorAll('input');
        for (let idx = 0; idx < inputs.length; idx++) {
            const input = inputs[idx];
            const i = Math.floor(idx / 9);
            const j = idx % 9;
            const correctValue = fullSolution[i][j];
            if (input.readOnly) {
                // Pre-filled, already correct
                input.style.backgroundColor = '#e9ecef';
            } else {
                if (input.value === '') {
                    // Empty, fill with correct
                    input.value = correctValue;
                    input.style.backgroundColor = 'white';
                    input.style.color = 'black';
                } else if (parseInt(input.value) === correctValue) {
                    // Correct
                    input.style.backgroundColor = 'lightgreen';
                } else {
                    // Incorrect
                    input.style.backgroundColor = 'lightcoral';
                }
            }
        }
    });

    function isValidSudoku(board) {
        // Check rows
        for (let i = 0; i < 9; i++) {
            const set = new Set();
            for (let j = 0; j < 9; j++) {
                const num = board[i][j];
                if (num === 0 || set.has(num)) return false;
                set.add(num);
            }
        }

        // Check columns
        for (let j = 0; j < 9; j++) {
            const set = new Set();
            for (let i = 0; i < 9; i++) {
                const num = board[i][j];
                if (num === 0 || set.has(num)) return false;
                set.add(num);
            }
        }

        // Check 3x3 boxes
        for (let box = 0; box < 9; box++) {
            const set = new Set();
            const startRow = Math.floor(box / 3) * 3;
            const startCol = (box % 3) * 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const num = board[startRow + i][startCol + j];
                    if (num === 0 || set.has(num)) return false;
                    set.add(num);
                }
            }
        }

        return true;
    }
});