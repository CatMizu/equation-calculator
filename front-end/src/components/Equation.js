import React, { useState } from "react";
import axios from "axios";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import Parameter from "./Parameters";
import { useAuth } from "../utils/auth";
import styles from "./Equation.module.css";

addStyles();

function Equation({ equationData }) {
  const [equation, setEquation] = useState(equationData.latex);
  const [solveFor, setSolveFor] = useState("");
  const [parameters, setParameters] = useState(equationData.parameters);
  const [solution, setSolution] = useState("");
  const auth = useAuth();

  const addParameter = () => {
    setParameters([...(parameters || []), { name: "", value: "" }]);
  };

  const handleParametersChange = (index, name, event) => {
    const values = [...parameters];
    if (name === "name") {
      values[index].name = event.target.value;
    } else {
      values[index].value = event.target.value;
    }
    setParameters(values);
  };

  const deleteParameter = (index) => {
    const values = [...parameters];
    values.splice(index, 1);
    setParameters(values);
  };

  const handleEquationChange = (mathField) => {
    setEquation(mathField.latex());
  };

  const handleSolveForChange = (event) => {
    setSolveFor(event.target.value);
  };

  const handleSolveEquation = async (event) => {
    event.preventDefault();

    const parametersObject = parameters.reduce(
      (acc, param) => ({ ...acc, [param.name]: param.value }),
      {}
    );

    if (!/^[a-zA-Z]{1}$/.test(solveFor) || !equation.includes(solveFor)) {
      alert("Invalid solveFor value");
      return;
    }

    try {
      const token = await auth.getSession();
      const accessToken = token.access.token;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/equations/solve`,
        {
          latex: equation,
          parameters: parametersObject,
          solveFor,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSolution(response.data.solution);
      console.log("Equation solved successfully!", response.data.solution);
    } catch (error) {
      console.error("Failed to solve the equation", error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const parametersObject = parameters.reduce(
      (acc, param) => ({ ...acc, [param.name]: param.value }),
      {}
    );
    console.log(parametersObject);
    try {
      const token = await auth.getSession();
      const accessToken = token.access.token;
      await axios.post(
        `${process.env.REACT_APP_API_URL}/equations`,
        {
          latex: equation,
          parameters: parametersObject,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("Equation saved successfully!");
    } catch (error) {
      console.error("Failed to save the equation", error);
    }
  };

  return (
    <div className={styles["equation-container"]}>
      <h3>Equation:</h3>
      <div>
        <EditableMathField latex={equation} onChange={handleEquationChange} />
      </div>
      <h3>Solve for:</h3>
      <input
        type="text"
        value={solveFor}
        onChange={handleSolveForChange}
        placeholder="Enter the variable to solve for"
      />

      <h3>Parameters:</h3>
      {parameters &&
        parameters.map((parameter, index) => (
          <Parameter
            key={index}
            index={index}
            parameter={parameter}
            onParameterChange={(name, event) =>
              handleParametersChange(index, name, event)
            }
            onParameterDelete={() => deleteParameter(index)}
          />
        ))}

      <button onClick={addParameter}>Add Parameter</button>
      <button onClick={handleSolveEquation}>Solve</button>
      <button onClick={handleSave}>Save Equation</button>
      {solution && (
        <div>
          <h3>Solution:</h3>
          <StaticMathField>{solution}</StaticMathField>
        </div>
      )}
      <div className={styles.separator}></div>
    </div>
  );
}

export default Equation;
