import React, { useState } from "react";
import axios from "axios";
import Input from "./input/Input";

function Login({ onLogin, setIsLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Сброс ошибки при новой попытке входа
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      if (response.data.success) {
        onLogin(response.data.idUser);
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto p-2">
      {error && <alert variant="danger">{error}</alert>}
      <Input
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="btn btn-primary mt-3">
        Login
      </button>
      <button
        className="btn btn-secondary mt-3 ml-3"
        onClick={() => setIsLogin(false)}
      >
        У вас нет учетной записи? Зарегистрируйтесь здесь
      </button>
    </form>
  );
}

export default Login;
