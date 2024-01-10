// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with the class 'cell' (representing individual cells of the game grid)
  const cells = document.querySelectorAll('.cell');

  // Get elements representing player scores, current player display, reset button, start again button, and the grid
  const playerXScore = document.getElementById('playerX');
  const playerOScore = document.getElementById('playerO');
  const currentPlayerDisplay = document.getElementById('currentPlayerDisplay');
  const resetButton = document.getElementById('resetButton');
  const startAgainButton = document.getElementById('startAgainButton');
  const grid = document.getElementById('grid');

  // Initialize game variables
  let currentPlayer = 'X';
  let board = ['', '', '', '', '', '', '', '', '']; // Represents the game board
  let gameOver = false;
  let moves = 0; // Number of moves played
  let playerXWins = 0; // Player X's win count
  let playerOWins = 0; // Player O's win count

  // Define winning combinations for the game
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Attach a click event listener to each cell of the grid
  cells.forEach(cell => {
    cell.addEventListener('click', cellClickHandler);
  });

  // Event listeners for the reset and start again buttons
  resetButton.addEventListener('click', resetGame);
  startAgainButton.addEventListener('click', startAgain);

  // Function to handle cell clicks
  function cellClickHandler(event) {
    const selectedCell = event.target;
    const selectedCellIndex = parseInt(selectedCell.id);

    // Check if the selected cell is empty and the game is not over
    if (board[selectedCellIndex] === '' && !gameOver) {
      board[selectedCellIndex] = currentPlayer; // Update the board with current player's move
      selectedCell.textContent = currentPlayer; // Display the player's mark (X or O) in the cell

      // Check for a win after each move
      if (checkWin()) {
        gameOver = true;
        updateScore();
        displayResult(`Player ${currentPlayer} wins!`);
        return;
      }

      // Switch to the other player's turn
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      moves++;

      // Check for a draw (if all cells are filled and no winner)
      if (moves === 9) {
        gameOver = true;
        updateScore();
        displayResult("It's a draw!");
      } else {
        currentPlayerDisplay.textContent = `Current player: ${currentPlayer}`;
      }
    }
  }

  // Function to check for a win based on winning combinations
  function checkWin() {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

  // Function to update scores based on the current player
  function updateScore() {
    if (currentPlayer === 'X') {
      playerXWins++;
      playerXScore.textContent = playerXWins.toString();
    } else {
      playerOWins++;
      playerOScore.textContent = playerOWins.toString();
    }
  }

  // Function to display game result messages
  function displayResult(message) {
    currentPlayerDisplay.textContent = message;
  }

  // Function to reset the game state
  function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    moves = 0;

    // Clear the content of all cells in the grid
    cells.forEach(cell => {
      cell.textContent = '';
    });

    currentPlayerDisplay.textContent = `Current player: ${currentPlayer}`;
  }

  // Function to start the game again by resetting scores and the game state
  function startAgain() {
    playerXWins = 0;
    playerOWins = 0;
    playerXScore.textContent = '0';
    playerOScore.textContent = '0';
    resetGame(); // To clear the cells and start a new game
  }
});
