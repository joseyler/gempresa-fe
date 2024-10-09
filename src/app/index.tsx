"use client"
import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";
import Line from "./components/Line";

const components = [
  ["Line", Line],
];

export default function App() {

  return (
    <div>
      {components.map(([label, Comp]) => {
        return (
          <div key={label + ""}>
            {/* <h1>{label}</h1> */}
            <div>
              <Comp />
            </div>
          </div>
        );
      })}
      <div style={{ height: "50rem" }} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
