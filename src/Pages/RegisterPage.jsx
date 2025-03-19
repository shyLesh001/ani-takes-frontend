import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(username, email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-80"
      >
        <div className="mb-4">
          <label className="block text-sm mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 border rounded-md text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded-md text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 p-2 rounded-md hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
