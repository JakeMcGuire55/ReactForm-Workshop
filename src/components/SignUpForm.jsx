import React from "react";
import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [userError, setUserError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.length >= 8) {
      try {
        const result = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          }
        );
        const data = await result.json();
        console.log(data);
        setToken(data.token);
      } catch (error) {
        setError(error.message);
      }
    } else {
        setUserError("Longer Username Needed");
    }
  }
  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            placeholder="Minimum 8 Characters"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
      <p onSubmit={handleSubmit}>{userError}</p>
    </>
  );
}
