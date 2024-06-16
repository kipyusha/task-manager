import React, { useState } from "react";
import axios from "axios";
import Input from "./input/Input";

function Register({ onRegister, setIsLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        password,
      });
      if (response.data.success) {
        setSuccess("Registration successful");
        onRegister(response.data.idUser);
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 w-50 mx-auto p-2">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <Input
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit" className="btn btn-primary mt-3">
        Register
      </button>
      <button
        className="btn btn-secondary mt-3 ml-3 fs-xs"
        onClick={() => setIsLogin(true)}
      >
        У вас уже есть аккаунт? Войдите здесь
      </button>
    </form>
  );
}

export default Register;
