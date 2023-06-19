import React, { useState } from "react";
import axios from "axios";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import Parameter from "./Parameter";
import { useAuth } from "../utils/auth";
import styles from "./Equation.module.css";
import validateEquationInput from "../utils/equationInputValidator";

addStyles();

function Equation({ equationData }) {
  const [equation, setEquation] = useState(equationData.latex);
  const [solveFor, setSolveFor] = useState("");
  const [parameters, setParameters] = useState(equationData.parameters || {});
  const [solution, setSolution] = useState("");
  const [displaySolveFor, setDisplaySolveFor] = useState("");
  const auth = useAuth();

  const addParameter = () => {
    setParameters({ ...parameters, "": "" });
  };

  const handleParametersChange = (oldName, name, event) => {
    if (name === "name") {
      setParameters((prevParameters) => {
        const value = prevParameters[oldName];
        const { [oldName]: _, ...newParameters } = prevParameters;

        return { ...newParameters, [event.target.value]: value };
      });
    } else {
      setParameters({ ...parameters, [oldName]: event.target.value });
    }
  };

  const deleteParameter = (name) => {
    const { [name]: _, ...rest } = parameters;
    setParameters(rest);
  };

  const handleEquationChange = (mathField) => {
    setEquation(mathField.latex());
  };

  const handleSolveForChange = (event) => {
    setSolveFor(event.target.value);
  };

  const handleSolveEquation = async (event) => {
    event.preventDefault();

    validateEquationInput(equation, solveFor, parameters);

    try {
      const token = await auth.getSession();
      const accessToken = token.access.token;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/equations/solve`,
        {
          latex: equation,
          parameters,
          solveFor,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSolution(response.data.solution);
      setDisplaySolveFor(`${solveFor} = `);
      console.log("Equation solved successfully!", response.data.solution);
    } catch (error) {
      console.error("Failed to solve the equation", error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const token = await auth.getSession();
      const accessToken = token.access.token;
      await axios.post(
        `${process.env.REACT_APP_API_URL}/equations`,
        {
          latex: equation,
          parameters,
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
    <div className={styles["equation-panel"]}>
      <button className={styles["delete-panel-button"]}>x</button>
      <div className={styles["equation-content"]}>
        <h3>Equation:</h3>
        <div>
          <EditableMathField latex={equation} onChange={handleEquationChange} />
        </div>
        <h3>Solve for:</h3>
        <input
          type="text"
          value={solveFor}
          onChange={handleSolveForChange}
          placeholder="Enter a variable to solve"
        />

        <h3>Parameters:</h3>
        {Object.entries(parameters).map(([name, value], index) => (
          <Parameter
            key={index}
            index={index}
            parameter={{ name, value }}
            onParameterChange={(newName, event) =>
              handleParametersChange(name, newName, event)
            }
            onParameterDelete={() => deleteParameter(name)}
          />
        ))}

        <button className={styles["add-button"]} onClick={addParameter}>
          Add Parameter
        </button>
        {solution && (
          <div>
            <h3>Solution:</h3>
            <span>
              {displaySolveFor}
              <StaticMathField>{solution}</StaticMathField>
            </span>
          </div>
        )}
      </div>
      <div className={styles["button-container"]}>
        <button onClick={handleSolveEquation}>Solve</button>
        <button onClick={handleSave}>Save Equation</button>
      </div>
    </div>
  );
}

export default Equation;
