import "./Cell.css";
export default function Cell(props) {
  return (
    <button className="square" onClick={props.updateValue}>
      {props.value}
    </button>
  );
}
