import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthRequired from "./AuthRequired";
import Home from "./Home";
import Enter from "./Enter";
import * as api from "../api";

export default () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequired>
            <Home />
          </AuthRequired>
        }
      />
      <Route path="/enter" element={<Enter />} />
    </Routes>
  );
};
