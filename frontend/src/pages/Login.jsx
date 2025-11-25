import React, { useState } from "react";
import { api } from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      setMessage(res.data.message + " (userId: " + res.data.userId + ")");
    } catch (err) {
      setMessage("Login failed");
    }
  };

  return (
    <div className="mt-16 max-w-md mx-auto">
      <h2 className="text-3xl text-center mb-8 tracking-[0.25em]">Login —</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Forgot your password?</span>
          <span>Create account</span>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-3 mt-2 text-sm"
        >
          Sign In
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-xs text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default Login;