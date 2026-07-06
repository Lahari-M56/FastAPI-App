import { useState } from "react";
import { register } from "../Services/AuthService";
import axios from "axios";

type Props = {
  onSwitchToLogin: () => void;
};

function Register({ onSwitchToLogin }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({
        name,
        email,
        password,
        role,
      });

      alert("Registration successful! Please login.");
      onSwitchToLogin();
    } catch (error) {
      console.error("Registration Error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Backend Response:", error.response.data);
          alert(error.response.data.detail);
        } else if (error.request) {
          alert("Cannot connect to backend.");
        } else {
          alert(error.message);
        }
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />

      <br />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <br />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <br />

      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role (admin/user)"
        required
      />

      <br />

      <button type="submit">Register</button>

      <p>
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin}>
          Login
        </button>
      </p>
    </form>
  );
}

export default Register;