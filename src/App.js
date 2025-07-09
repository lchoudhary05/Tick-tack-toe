import { useState } from "react";
import Cell from "./Cell";

export default function Board() {
  const [turn, setTurn] = useState("X");
  let item = [1, 3, 4];
  return (
    <>
      <h3>Your Turn: {turn}</h3>
      {item.map((_) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {item.map((_) => (
            <Cell curr={turn} setCurr={setTurn} />
          ))}
        </div>
      ))}
    </>
  );
}
