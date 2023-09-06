import { useState } from "react";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(" https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      sessionStorage.setItem("token", data.token);
      setIsAuthenticated(true);
    }
  };

  return (
    <div class="d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        class="border rounded p-3  m-5 bg-secondary"
        style={{ width: "300px" }}
      >
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            class="ml-4"
          />
        </label>{" "}
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>{" "}
        <br />
        <button type="submit" class="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
