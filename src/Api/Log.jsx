import React, { useState } from "react";
import Login from "./Login";
import Prot from "./Prot";
function Log() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token")
  );
  return (
    <>
      {isAuthenticated ? (
        <Prot />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
}
export default Log;
