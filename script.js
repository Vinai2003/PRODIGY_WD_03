document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    const playerVsPlayerButton = document.getElementById('player-vs-player');
    const playerVsComputerButton = document.getElementById('player-vs-computer');

    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let isPlayerVsComputer = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = () => {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return gameState.includes(null) ? null : 'Draw';
    };

    const handleClick = (e) => {
        const cellIndex = e.target.getAttribute('data-index');
        if (gameState[cellIndex] || checkWin()) return;

        gameState[cellIndex] = currentPlayer;
        e.target.textContent = currentPlayer;

        const winner = checkWin();
        if (winner) {
            statusText.textContent = winner === 'Draw' ? 'It\'s a draw!' : `${winner} wins!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `Player ${currentPlayer}'s turn`;

            if (isPlayerVsComputer && currentPlayer === 'O') {
                computerMove();
            }
        }
    };

    const computerMove = () => {
        const emptyCells = gameState.map((val, index) => val === null ? index : null).filter(val => val !== null);
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState[randomIndex] = currentPlayer;
        cells[randomIndex].textContent = currentPlayer;

        const winner = checkWin();
        if (winner) {
            statusText.textContent = winner === 'Draw' ? 'It\'s a draw!' : `${winner} wins!`;
        } else {
            currentPlayer = 'X';
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const restartGame = () => {
        gameState.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    };

    const startPlayerVsPlayer = () => {
        isPlayerVsComputer = false;
        restartGame();
    };

    const startPlayerVsComputer = () => {
        isPlayerVsComputer = true;
        restartGame();
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    restartButton.addEventListener('click', restartGame);
    playerVsPlayerButton.addEventListener('click', startPlayerVsPlayer);
    playerVsComputerButton.addEventListener('click', startPlayerVsComputer);

    statusText.textContent = `Player ${currentPlayer}'s turn`;
});
