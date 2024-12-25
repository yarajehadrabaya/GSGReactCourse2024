import React from "react";

const ResultDisplay = ({ result }) => {
  return (
    <div
      style={{
        padding: "10px",
        fontSize: "24px",
        textAlign: "right",
        background: "#f4f4f4",
        borderRadius: "8px",
        marginBottom: "10px",
        minHeight: "50px",
        color:"black",
      }}
    >
      {result}
    </div>
  );
};

export default ResultDisplay;
