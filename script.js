const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let game_status = document.getElementsByClassName("game-status")[0];
let gameWon = false; 
document.getElementById('game-restart').addEventListener('click', resetGame);
let count = 0;


// function to reset the ame
function resetGame() {

    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.disabled = false;
    });
    gameWon = false;
    game_status.innerHTML = '';
    currentPlayer = 'X';
    count = 0;
};

// event listener for cell clicks
cells.forEach(cell => cell.addEventListener('click' , function () {
    count += 1;
    if (!gameWon){
        handleCellClick(cell);
        checkForDraw();
    }
}));

// Function to handle cell clicks
function handleCellClick(cell) {

    if (cell.innerHTML === '') {
        cell.innerHTML = currentPlayer;
        cell.disabled = true;
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }

    if (count > 4){
    const winner = handleWinner();
        if (winner) {
            game_status.innerHTML = `Player ${winner} wins`;
            cells.forEach(cell => cell.disabled = true);
            gameWon = true;
        }
    }
};

// Function to check for a winner
function handleWinner() {
    console.log("run")
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns ) {
        const [a, b, c] = pattern;
        if (
            cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
            ) {
                return cells[a].textContent;
            }
    }
    return null;
};

// Function to check for a draw
function checkForDraw() {
    if (count === 9 && !gameWon) {
        game_status.innerHTML = 'It\'s a draw!';
        gameWon = true;
    }
}
