import { useState } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleOnClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleOnClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 1, 2],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  // null es que no hay ganador y false es que hay un empate
  const [winner, setWinner] = useState(null);

  // Check winner
  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si x / o ganó
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    // no actualizamos la posición si ya tiene una x o una o

    // Esta línea significa que oye, si esa posición ya tiene algo, haz un return,
    // y sale de la función, porque las funciones sólo pueden tener un return
    if (board[index] || winner) return;

    // Actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn; // (x / o)
    setBoard(newBoard);

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Reviso si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((cell, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : `Ha ganado la ${winner}`}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
