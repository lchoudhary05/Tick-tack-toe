import { useState } from "react";

export default function Cell(props) {
  const [present, setPresent] = useState("");
  function handleClick() {
    if (props.curr === "X") props.setCurr("O");
    else props.setCurr("X");

    setPresent(props.curr);
  }
  return (
    <>
      <div
        style={{
          backgroundColor: "#c6c8cc",
          width: "50px",
          height: "60px",
          borderStyle: "solid",
        }}
        onClick={handleClick}
      >
        {present}
      </div>
    </>
  );
}
