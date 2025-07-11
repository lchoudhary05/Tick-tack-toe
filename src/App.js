import { useEffect, useState } from "react";
import Cell from "./Cell";
import "./Cell.css";

export default function App() {
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);
  const [values, setValues] = useState(Array(9).fill(null));
  useEffect(() => {
    findWinner();
  }, [values]);
  function handleMove(i) {
    if (values[i] || winner) {
      return;
    }
    let newValues = values.slice();
    newValues[i] = turn;
    setValues(newValues);
    if (turn == "X") {
      setTurn("O");
    } else {
      setTurn("X");
    }
  }
  function restart() {
    setValues(Array(9).fill(null));
    setTurn("X");
    setWinner(null);
  }
  function findWinner() {
    for (let x = 0; x < winnerTable.length; x++) {
      const [a, b, c] = winnerTable[x];
      if (values[a] && values[a] == values[b] && values[b] == values[c]) {
        setWinner(values[a]);
        return values[a];
      }
    }
    return null;
  }

  return (
    <>
      <div className="Mid">
        {!winner && <h3>Next Turn:{turn}</h3>}
        {winner && <h3>Winner:{winner}</h3>}

        <div className="grid-row">
          <Cell value={values[0]} setSquare={() => handleMove(0)} />
          <Cell value={values[1]} setSquare={() => handleMove(1)} />
          <Cell value={values[2]} setSquare={() => handleMove(2)} />
        </div>
        <div className="grid-row">
          <Cell value={values[3]} setSquare={() => handleMove(3)} />
          <Cell value={values[4]} setSquare={() => handleMove(4)} />
          <Cell value={values[5]} setSquare={() => handleMove(5)} />
        </div>
        <div className="grid-row">
          <Cell value={values[6]} setSquare={() => handleMove(6)} />
          <Cell value={values[7]} setSquare={() => handleMove(7)} />
          <Cell value={values[8]} setSquare={() => handleMove(8)} />
        </div>
        <button onClick={restart}>Restart</button>
      </div>
    </>
  );
}

const winnerTable = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
