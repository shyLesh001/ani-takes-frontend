import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://anitakes-backend.onrender.com/api/users/login",
        { email, password }
      );
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/reviews");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post(
        "https://anitakes-backend.onrender.com/api/users/register",
        {
          username,
          email,
          password,
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
