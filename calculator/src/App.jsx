import React, { useState } from "react";
import ResultDisplay from "./components/ResultDisplay";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setResult(eval(input)); 
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  return (
    <div style={{ width: "300px", margin: "50px auto", textAlign: "center" }}>
      <ResultDisplay result={result || input || "0"} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {["1", "2", "3", 
        "4", "5", "6", 
        "7", "8", "9", 
        "0", "+", "-"]
        .map((item) => (
          <button
            key={item}
            style={{
              padding: "15px",
              fontSize: "18px",
              borderRadius: "5px",
              background: "#357EDD",
              color: "white",
              border: "none",
            }}
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </button>
        ))}
        <button
          style={{
            gridColumn: "span 2",
            padding: "15px",
            fontSize: "18px",
            borderRadius: "5px",
            background: "#4CAF50",
            color: "white",
            border: "none",
          }}
          onClick={() => handleButtonClick("=")}
        >
          =
        </button>
        <button
          style={{
            padding: "15px",
            fontSize: "18px",
            borderRadius: "5px",
            background: "#FF5722",
            color: "white",
            border: "none",
          }}
          onClick={() => handleButtonClick("C")}
        >
          C
        </button>
      </div>
    </div>
  );
};

export default App;
