const cells = document.querySelectorAll('.cell');
const board = Array(9).fill(null);
let currentPlayer = 'X'; // Player starts as 'X'
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add event listeners for human player moves
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = parseInt(cell.getAttribute('data-index'), 10);
        if (!board[index] && isGameActive && currentPlayer === 'X') {
            playerMove(index);
        }
    });
});

// Player makes a move
function playerMove(index) {
    board[index] = 'X';
    cells[index].textContent = 'X';
    if (checkWin('X')) {
        alert('Player wins!');
        isGameActive = false;
    } else if (board.every(cell => cell)) {
        alert("It's a draw!");
        isGameActive = false;
    } else {
        currentPlayer = 'O';
        setTimeout(computerMove, 500); // Delay for computer's move
    }
}

// Computer makes a move (simple random move AI)
function computerMove() {
    if (!isGameActive) return;

    const availableCells = board
        .map((cell, index) => (cell === null ? index : null))
        .filter(index => index !== null); // Get available spots

    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';

        if (checkWin('O')) {
            alert('Computer wins!');
            isGameActive = false;
        } else if (board.every(cell => cell)) {
            alert("It's a draw!");
            isGameActive = false;
        } else {
            currentPlayer = 'X'; // Back to player's turn
        }
    }
}

// Check if a player has won
function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Reset the game
function resetGame() {
    board.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    isGameActive = true;
}
