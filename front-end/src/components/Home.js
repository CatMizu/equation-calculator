// Home.js
import React, { useState } from "react";
import axios from "axios";
import Equation from "./Equation";

function Home() {
  const [equation, setEquation] = useState("");
  const [solveFor, setSolveFor] = useState("");
  const [parameters, setParameters] = useState([]);

  const addParameter = () => {
    setParameters([...parameters, { key: "", value: "" }]);
  };

  const handleParametersChange = (index, event) => {
    const values = [...parameters];
    if (event.target.name === "key") {
      values[index].key = event.target.value;
    } else {
      values[index].value = event.target.value;
    }
    setParameters(values);
  };

  const handleEquationChange = (event) => {
    setEquation(event.target.value);
  };

  const handleSolveForChange = (event) => {
    setSolveFor(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const parametersObject = parameters.reduce(
      (acc, param) => ({ ...acc, [param.key]: param.value }),
      {}
    );

    try {
      const response = await axios.post(
        "https://px4zqeyrb4.execute-api.us-east-1.amazonaws.com/dev/equation/solve",
        {
          latex: equation,
          parameters: parametersObject,
          solveFor,
        }
      );
      console.log("Equation solved successfully!", response.data);
    } catch (error) {
      console.error("Failed to solve the equation", error.message);
    }
  };

  return (
    <div>
      <Equation
        equation={equation}
        handleEquationChange={handleEquationChange}
        solveFor={solveFor}
        handleSolveForChange={handleSolveForChange}
        parameters={parameters}
        handleParametersChange={handleParametersChange}
      />

      <button onClick={addParameter}>Add Parameter</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Home;
