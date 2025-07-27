"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");
    if (storedToken) {
      setToken(storedToken);
      setUserName(storedName);
    }
  }, []);

  const login = (token, name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    setToken(token);
    setUserName(name);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setToken(null);
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ token, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
