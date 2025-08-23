import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken, setToken, setUserData, getUserData } from "../utils/token";

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const [user, setUser] = useState(getUserData());

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const login = ({ token, user }) => {
    setToken(token);
    setUserData(user);
    setIsAuthenticated(true);
    setUser(user);

    // Redirect based on role
    if (user.role === "admin") navigate("/admin/dashboard");
    else if (user.role === "guide") navigate("/guide/dashboard");
    else navigate("/dashboard"); // normal user
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
};

export default useAuth;
