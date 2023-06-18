import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { RequireAuth } from "../components/RequireAuth";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default AllRoutes;
