import React from "react";
import Parameter from "./Parameters";

function Equation({
  equation,
  handleEquationChange,
  solveFor,
  handleSolveForChange,
  parameters,
  handleParametersChange,
}) {
  return (
    <div>
      <h3>Equation:</h3>
      <input
        type="text"
        value={equation}
        onChange={handleEquationChange}
        placeholder="Enter the equation"
      />
      <h3>Solve for:</h3>
      <input
        type="text"
        value={solveFor}
        onChange={handleSolveForChange}
        placeholder="Enter the variable to solve for"
      />

      <h3>Parameters:</h3>
      {parameters.map((parameter, index) => (
        <Parameter
          key={index}
          index={index}
          parameter={parameter}
          handleParametersChange={handleParametersChange}
        />
      ))}
    </div>
  );
}

export default Equation;
