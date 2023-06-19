import React, { useState, useEffect } from "react";
import axios from "axios";
import Equation from "./Equation";
import { useAuth } from "../utils/auth";

function Home() {
  const [equations, setEquations] = useState([]);
  const auth = useAuth();
  const exampleEquation = {
    latex: "x+y=2",
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

  return (
    <div>
      <Equation equationData={exampleEquation} />
      {equations.map((equationData, index) => (
        <Equation key={index} equationData={equationData} />
      ))}
    </div>
  );
}

export default Home;
