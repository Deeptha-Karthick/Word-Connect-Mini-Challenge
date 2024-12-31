import "./styles.css";
import { useState, useRef, useEffect } from "react";

export default function App() {
  const [relatedWords, setRelatedWords] = useState([
    { name: "India", id: 1 },
    { name: "Delhi", id: 1 },
    { name: "India2", id: 2 },
    { name: "Delhi2", id: 2 },
    { name: "India3", id: 3 },
    { name: "Delhi3", id: 3 },
    { name: "India4", id: 4 },
    { name: "Delhi4", id: 4 },
  ]);
  const timerID = useRef(null);

  const [selected, setSelected] = useState([]);
  const [matchFound, setMatchFound] = useState(null);

  const onWordClick = (el) => {
    if (selected.length < 2) {
      setSelected((prev) => [...prev, el]);
    }
  };

  useEffect(() => {
    if (selected.length === 2) {
      setMatchFound(selected[0].id === selected[1].id);
      if (timerID.current) {
        clearTimeout(timerID.current);
      }
      timerID.current = setTimeout(() => {
        setMatchFound(null);
        setSelected([]);
        setRelatedWords((prev) =>
          prev.filter((el) => el.id !== selected[0].id)
        );
      }, 2000);
    }
  }, [selected]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div className="word-connect-challenge">
        {relatedWords.map((el) => {
          return (
            <div
              key={el.name}
              className={`box ${
                selected.find((elem) => elem.name === el.name)
                  ? matchFound
                    ? "green"
                    : matchFound === null
                    ? "blue"
                    : "red"
                  : ""
              }`}
              onClick={() => matchFound === null && onWordClick(el)}
            >
              {el.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
