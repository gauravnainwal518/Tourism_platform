import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken, saveToken } from '../utils/tokenUtils'; // Utility functions for token management

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
  const navigate = useNavigate();

  const login = (token) => {
    saveToken(token);
    setIsAuthenticated(true);
    navigate('/'); // Redirect to home or other protected route
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
    navigate('/login'); 
  };

  return {
    isAuthenticated,
    login,
    logout
  };
};

export default useAuth;
