import { useEffect, useState } from "react";
import Cell from "./Cell";

export default function App() {
  const [values, setValues] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState("X");

  useEffect(() => {
    CalculateWinner();
  }, [values]);

  function updateBoard(value, index) {
    setValues(history[index]);
    if (CountOccurences(value, "X") <= CountOccurences(value, "O")) {
      setTurn("X");
    } else setTurn("O");
  }
  function CalculateWinner() {
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
    for (let x = 0; x < winnerTable.length; x++) {
      const [a, b, c] = winnerTable[x];
      if (values[a] && values[a] == values[b] && values[b] == values[c]) {
        setWinner(values[a]);
        return;
      }
    }
    if (winner) setWinner(null);
  }
  function restart() {
    setValues(Array(9).fill(null));
    setWinner(null);
    setTurn("X");
    setHistory([Array(9).fill(null)]);
  }

  function handleClick(i) {
    if (winner || values[i]) return;
    else {
      let tempValues = values.slice();
      if (turn === "X") {
        tempValues[i] = "X";
        setTurn("O");
      } else {
        tempValues[i] = "O";
        setTurn("X");
      }
      setValues(tempValues);
      let curr =
        CountOccurences(tempValues, "X") + CountOccurences(tempValues, "O");
      let tempHistory = history.slice(0, curr);
      // setHistory([...history, tempValues]);
      setHistory([...tempHistory, tempValues]);
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {winner ? <h2>Winner:{winner}</h2> : <h3>Next Turn:{turn}</h3>}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Cell value={values[0]} updateValue={() => handleClick(0)} />
          <Cell value={values[1]} updateValue={() => handleClick(1)} />
          <Cell value={values[2]} updateValue={() => handleClick(2)} />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Cell value={values[3]} updateValue={() => handleClick(3)} />
          <Cell value={values[4]} updateValue={() => handleClick(4)} />
          <Cell value={values[5]} updateValue={() => handleClick(5)} />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Cell value={values[6]} updateValue={() => handleClick(6)} />
          <Cell value={values[7]} updateValue={() => handleClick(7)} />
          <Cell value={values[8]} updateValue={() => handleClick(8)} />
        </div>
        <button style={{ marginTop: "10px", height: "30px" }} onClick={restart}>
          Reset Game
        </button>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", marginLeft: "30px" }}
      >
        <h1>Review</h1>

        <ol>
          {history.map((value, index) => (
            <li key={index}>
              <button onClick={() => updateBoard(value, index)}>
                {index === 0 ? <>Go to start</> : <>Move:{index}</>}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
function CountOccurences(arr, val) {
  return arr.filter((element) => element === val).length;
}
