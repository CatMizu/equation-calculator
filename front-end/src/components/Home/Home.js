import React, { useState, useEffect } from "react";
import axios from "axios";
import Equation from "../Equation/Equation";
import { useAuth } from "../../utils/auth";
import styles from "./Home.module.css";

function Home() {
  const [equations, setEquations] = useState([]);
  const auth = useAuth();
  const exampleEquation = {
    id: 0,
    latex: "\\sqrt{x^2}=4",
    parameters: { y: 1 },
  };

  useEffect(() => {
    const fetchEquations = async () => {
      try {
        const token = await auth.getSession();
        const accessToken = token.access.token;
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/equations`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setEquations(response.data.equations);
      } catch (error) {
        console.error("Failed to fetch equations", error);
      }
    };

    fetchEquations();
  }, []);

  const handleSaveEquation = async (latex, parameters) => {
    try {
      const token = await auth.getSession();
      const accessToken = token.access.token;
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/equations`,
        {
          latex,
          parameters,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setEquations([response.data.equation, ...equations]);
      alert("Equation saved successfully!");
    } catch (error) {
      console.error("Failed to save the equation", error);
    }
  };

  const handleDeleteEquation = async (equationId) => {
    if (equationId === 0) {
      alert("Can not delete the example equation");
      return;
    }
    try {
      const token = await auth.getSession();
      const accessToken = token.access.token;
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/equations/${equationId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setEquations(equations.filter((equation) => equation.id !== equationId));
      alert("Equation deleted");
    } catch (error) {
      console.error("Failed to delete the equation", error);
    }
  };

  return (
    <div className={styles["equation-container"]}>
      <Equation
        equationData={exampleEquation}
        onDeleteEquation={handleDeleteEquation}
        onSaveEquation={handleSaveEquation}
      />
      {equations.map((equationData) => (
        <Equation
          key={equationData.id}
          equationData={equationData}
          onSaveEquation={handleSaveEquation}
          onDeleteEquation={handleDeleteEquation}
        />
      ))}
    </div>
  );
}

export default Home;
