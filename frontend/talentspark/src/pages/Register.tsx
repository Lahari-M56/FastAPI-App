import { useState } from "react";
import axios from "axios";
import { register } from "../Services/AuthService";

type Props = {
  onSwitchToLogin: () => void;
};

function Register({ onSwitchToLogin }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role

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

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");

      onSwitchToLogin();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Registration Error:", error.response?.data);

        const message =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          "Registration failed.";

        alert(
          Array.isArray(message)
            ? message.map((m: any) => m.msg).join("\n")
            : message
        );
      } else {
        console.error(error);
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Role</label>
          <br />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <br />

        <button type="submit">Register</button>

        <p>
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;