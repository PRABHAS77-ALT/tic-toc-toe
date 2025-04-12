const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const toggleModeBtn = document.getElementById('toggle-mode');

let currentPlayer = 'X';
let gameActive = true;

// Winning combinations (indices)
const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

const startGame = () => {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X';
  gameActive = true;
  setStatusText();
};

const handleClick = (e) => {
  const cell = e.target;
  if (!gameActive) return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = `It's a draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  setStatusText();
};

const setStatusText = () => {
  statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const checkWin = (player) => {
  return winCombos.some(combo => {
    return combo.every(index => {
      return cells[index].textContent === player;
    });
  });
};

const isDraw = () => {
  return [...cells].every(cell => cell.textContent);
};

restartBtn.addEventListener('click', startGame);

// Toggle dark/light mode
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Start the game when page loads
startGame();
