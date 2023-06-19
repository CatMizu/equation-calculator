import React, { useState } from "react";
import axios from "axios";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";
import Parameter from "./Parameter";
import { useAuth } from "../../utils/auth";
import styles from "./Equation.module.css";
import validateEquationInput from "../../utils/equationInputValidator";

addStyles();

function Equation({ equationData, onSaveEquation, onDeleteEquation }) {
  const [equationLatex, setEquationLatex] = useState(equationData.latex);
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
    setEquationLatex(mathField.latex());
  };

  const handleSolveForChange = (event) => {
    setSolveFor(event.target.value);
  };

  const handleSolveEquation = async () => {
    if (!validateEquationInput(equationLatex, solveFor, parameters)) {
      return;
    }

    try {
      const token = await auth.getSession();
      const accessToken = token.access.token;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/equations/solve`,
        {
          latex: equationLatex,
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

  return (
    <div className={styles["equation-panel"]}>
      <button
        className={styles["delete-panel-button"]}
        onClick={() => {
          onDeleteEquation(equationData.id);
        }}
      >
        x
      </button>
      <div className={styles["equation-content"]}>
        <h3>Equation:</h3>
        <div>
          <EditableMathField
            latex={equationLatex}
            onChange={handleEquationChange}
          />
        </div>
        <h3>Solve for:</h3>
        <input
          type="text"
          value={solveFor}
          onChange={handleSolveForChange}
          placeholder="Enter variable to solve"
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
        <button
          onClick={() => {
            onSaveEquation(equationLatex, parameters);
          }}
        >
          Save Equation
        </button>
      </div>
    </div>
  );
}

export default Equation;
