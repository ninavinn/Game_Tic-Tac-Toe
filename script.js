const cells = document.querySelectorAll(".cell");
const statusElement = document.getElementById("status");
let currentPlayer = "X";
let board = Array(9).fill(null);

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.every((cell) => cell) ? "Tie" : null;
}

function handleClick(event) {
  const index = event.target.dataset.index;
  if (board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    if (winner === "Tie") {
      statusElement.textContent = "თამაშის შედეგი: არარის მოგებული";
    } else {
      statusElement.textContent = `თამაშის შედეგი: ${winner}-ის გამარჯვება`;
    }
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = `მიმდინარე თამაში: ${currentPlayer}-ის სვლა`;
  }
}

function resetGame() {
  board = Array(9).fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  statusElement.textContent = "მიმდინარე თამაში: X-ის სვლა";
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
